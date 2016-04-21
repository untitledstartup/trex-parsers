#!/usr/bin/env node

/**
 * Program options and arguments
 */
var program = require('commander');
var colors = require('colors');
var request = require('request');

program
  .version('0.0.1')
  .option('-i, --list-languages', 'Print out supported input languages')
  .option('-l, --language <lang>', 'Input language')
  .option('-m, --macro <Macro>', 'Override default macro')
  .option('-o, --output-file <file>', 'Write output to file instead of stdout')
  .option('-a, --access-token <token>', 'Automatically register keys with Trasnaltion Exchange using provided access token')
  .option('--host <host>', 'Manually specify host (default: api.translationexchange.com)')
  .option('-p, --pretty-print', 'Pretty print output')
  .option('-t, --trace', "Print out trace of a mis-/match (very verbose, best to use on single file)")
  .option('-S, --source <source>', 'Specify TML Source name (default: none)')
  .option('-L, --locale <locale>', 'Specify source locale (default: en)')
  .option('-v, --verbose', 'Be verbose');

program
  .arguments("<file> [file...]");

program.parse(process.argv);

var opts = program.opts();

// If asked, print out suppoerted languages and exit
var ExtensionLanguageMap = {
  "m": "objc",
  "swift": "swift",
  "html": "html",
  "htm": "html",
  "js": "js",
  "jsp": "jsp",
  "java": "java"/*,
  "php": "php"*/
};

if (opts.listLanguages) {
  var map = ExtensionLanguageMap;
  var langs = [];
  for (var ext in map) {
    if (langs.indexOf(map[ext]) < 0) {      
      langs.push(map[ext]);
    }
  }
  console.log("Supported languages: " + langs.join(", "));  
  process.exit(-1);
}

// Sanity checks
var sourceFiles = program.args;
if (!sourceFiles || sourceFiles.length == 0) {
  program.outputHelp();
  process.exit(-1);
}

var uploadFilePath = null;
if (opts.accessToken) {
  if (opts.outputFile) {
    uploadFilePath = opts.outputFile;
  }
  else {
    uploadFilePath = "/tmp/" + Date.now() + ".json";
  }
}


var fs = require('fs');
var path = require('path');
var ohm = require('ohm-js');
var utils = require('../lib/genstringUtils.js');

/**
 * Logging
 */
function logInfo(msg) {
  console.warn(msg);
}
function logWarn(msg) {
  console.warn(("! " + msg).yellow);
}
function logError(msg) {
  console.error(("!!! " + msg).red);
}

/**
 * FS helpers
 */
function testIfFileExists(filePath) {
  var exists = false;
  try {
      var stat = fs.statSync(filePath);
      if (stat && stat.isFile()) {
        exists = true;
      }
      
  }
  catch (e) {
  }
  return exists;
}
function testIfDirectoryExists(dir) {
  var exists = false;
  try {
      var stat = fs.statSync(dir);
      if (stat && stat.isDirectory()) {
        exists = true;
      }
      
  }
  catch (e) {
  }
  return exists;
}

/**
 * Language detection
 */
function languageForFileAtPath(filePath) {
  var extension = path.extname(filePath).substring(1);
  return ExtensionLanguageMap[extension];
}

/**
 * Grammar
 */
var GrammarNamespace = {};
global.GrammarNamespace = GrammarNamespace;
function grammarFilePathForLanguage(lang) {
  return path.resolve(__dirname, "../grammar/" + lang + ".ohm");
}
function grammarForLanguage(lang) {
  var grammarName = lang.substring(0,1).toUpperCase() + lang.substring(1);
  var grammar = GrammarNamespace[grammarName];
  if (!grammar) {
    var grammarFilePath = grammarFilePathForLanguage(lang);
    var grammarText = fs.readFileSync(grammarFilePath, 'utf8');
    grammar = ohm.grammar(grammarText, GrammarNamespace);
    GrammarNamespace[grammarName] = grammar;
  }
  return grammar;
}

/**
 * Semantics
 */
function semanticsFilePathForLanguage(lang) {
  return path.resolve(__dirname, "../semantics/" + lang + ".js");
}
function getSemanticsDataForLanguage(lang) {
  var semanticsFilePath = semanticsFilePathForLanguage(lang);
  var description = require(semanticsFilePath);
  return description;
}
function loadSemanticsData(semantics, data) {
  utils.loadSemanticsData(semantics, data);
}

/**
 * Parsing
 */
function parseFile(file, lang) {
  if (opts.verbose) {    
    logInfo("< ["+lang+"] " + file);
  }
  var grammar = grammarForLanguage(lang);
  if (opts.macro) {
    var macros = opts.macro.split("|");
    for (var i=0; i<macros.length; i++) {
      macros[i] = JSON.stringify(macros[i]);
    }
    var runtimeGrammarText = "Runtime <: " + grammar.name + " { macro := "+macros.join("|")+" }";
    grammar = ohm.grammar(runtimeGrammarText, GrammarNamespace);
  }
  var source = fs.readFileSync(file, 'utf8');
  
  var startTime = Date.now();
  if (opts.trace) {
    logInfo(grammar.trace(source).toString().replace(/\\n/g, "\n"));
  }
  var match = grammar.match(source);
  var endTime = Date.now();
  
  if (opts.verbose) {
    var duration = endTime - startTime;
    logInfo("> Processed file " + file + " (" + duration + "ms, "+(match.succeeded())+")");
  }
  if (!match.succeeded()) {
    return null;
  }
  
  var semanticData = getSemanticsDataForLanguage(lang);
  var semantics = grammar.extendSemantics(baseSemantics);
  loadSemanticsData(semantics, semanticData);
  var matchSemantics = semantics(match);
  var translationKeys = matchSemantics.translationKeys;
  if (translationKeys && translationKeys.results) {
    translationKeys = translationKeys.results;
  }
  else {
    translationKeys = null;
  }
  return translationKeys;
}

function postData(aUrl, data) {
  debugger;
  request.post({url: aUrl, formData: data}, function(err, response, body) {
    debugger;
  });
}

function postTranslationKeys(keysFile, callback) {
  var accessToken = opts.accessToken;
  var response = "No Response!";
  if (!accessToken) {
    logError("No valid access token provided");
    if (typeof callback == 'function') {
      callback(response);
    }
  }
  
  var host = opts.host ? opts.host : "api.translationexchange.com";
  if (host.indexOf("http") !== 0) {
    host = "https://" + host;
  }
  var url = host+"/v1/projects/current/import";
  
  var r = request.post(url, function(error, response, body){
    if (typeof callback == 'function') {
      try {
        response = JSON.parse(body);
      }
      catch(e) {
      }
      callback(response);
    }
  });
  
  var form = r.form();
  form.append("access_token", accessToken);
  form.append("file", fs.createReadStream(opts.outputFile), {filename: path.basename(opts.outputFile)});
}

function genTranslationKeys(files) {
  var result = {};
  
  for (var i=0; i<files.length; i++) {
    var file = files[i];
    
    if (!testIfFileExists(file)) {
      logWarn("Cannot find file: " + file);
      continue;
    }
    
    var lang = opts.language;
    if (!lang) {
      lang = languageForFileAtPath(file);
    }
    
    if (!lang) {
      logWarn("Could not determine source language");
      continue;
    }
    
    var translationKeys = parseFile(file, lang);
    if (!translationKeys || translationKeys.length === 0) {
      continue;
    }
    
    var str = "";
    for (var j=0; j<translationKeys.length; j++) {
      var key = translationKeys[j];
      var hash = key.id;
      if (!hash) {
        logWarn("Unhashed translation key: " + JSON.stringify(key));
        continue;
      }
      result[hash] = key;
    }
  }
  return result;
}

function main() {
  // pre-load Base grammar
  // TODO: loading higher grammar should preload supergrammars, then we wouldn't need to do this at all
  baseGrammar = grammarForLanguage("base");
  baseSemantics = baseGrammar.semantics();
  loadSemanticsData(baseSemantics, getSemanticsDataForLanguage("base"));
  
  var translationKeys = genTranslationKeys(sourceFiles);
  var translationMemory = [];
  for (var hash in translationKeys) {
    translationMemory.push({"key": translationKeys[hash]});
  }
  
  var sourceLocale = (opts.locale) ? opts.locale : 'en';
  var response = {
    "source_locale": sourceLocale,
    "translation_memory": translationMemory
  }
  
  var sourceName = (opts.source);
  if (sourceName) {
    var sourceStruct = {"name": sourceName, "keys": Object.keys(translationKeys)};
    response["sources"] = [sourceStruct];
  }
  
  var prettyPrint = !!opts.prettyPrint;
  var prettyPrintSpaces = (prettyPrint) ? 2 : 0;
  var outputFile = opts.outputFile || uploadFilePath;
  
  if (outputFile) {    
    fs.writeFileSync(outputFile, JSON.stringify(response, null, prettyPrintSpaces));
    if (opts.accessToken) {
      logInfo("> Uploading " + outputFile + "\n");
      postTranslationKeys(outputFile, function(response) {
        logInfo(JSON.stringify(response, null, prettyPrintSpaces));
      });
    }
  }
  else {
    process.stdout.write(JSON.stringify(response, null, prettyPrintSpaces));
  }
}

if (global && global.v8debug && v8debug.Debug) {    
  global.v8debug.Debug.setBreakOnException();
}

var baseGrammar, baseSemantics;

main();
