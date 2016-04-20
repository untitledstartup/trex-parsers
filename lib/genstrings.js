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
var files = program.args;
if (!files || files.length == 0) {
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
    console.warn("< ["+lang+"] " + file);
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
    console.warn(grammar.trace(source).toString().replace(/\\n/g, "\n"));
  }
  var match = grammar.match(source);
  var endTime = Date.now();
  
  if (opts.verbose) {
    var duration = endTime - startTime;
    console.warn("> Processed file " + file + " (" + duration + "ms, "+(match.succeeded())+")");
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
    console.error("!!! No valid access token provided".red);
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

function main() {  
  var outputFile = opts.outputFile;
  if (!outputFile) {
    outputFile = uploadFilePath;
  }
  var writeStream = null;
  if (outputFile) {
    var outDir = path.dirname(outputFile);
    if (!testIfDirectoryExists(outDir)) {
      fs.mkdirSync(outDir);
    }
    
    writeStream = fs.createWriteStream(outputFile, {
      'flags': 'w',
      'defaultEncoding': 'utf8'
    });
  }
  else {
    writeStream = process.stdout;
  }

  var prettyPrint = !!opts.prettyPrint;
  var prettyPrintSpaces = (prettyPrint) ? 2 : 0;
  var sourceLocale = (opts.locale) ? opts.locale : 'en';

  var response = {
    "source_locale": sourceLocale,
    "translation_memory": [] 
  }
  
  var responseStr = JSON.stringify(response, null, prettyPrintSpaces);
  var splitIndex = responseStr.indexOf("]", -1);
  writeStream.write(responseStr.substring(0, splitIndex));
  
  baseGrammar = grammarForLanguage("base");
  baseSemantics = baseGrammar.semantics();
  loadSemanticsData(baseSemantics, getSemanticsDataForLanguage("base"));
  
  var sourceName = (opts.source);
  var allKeys = [];
  
  if (global && global.v8debug && v8debug.Debug) {    
    global.v8debug.Debug.setBreakOnException();
  }
  
  var wroteKeys = false;
  for (var i=0; i<files.length; i++) {
    var file = files[i];
    
    if (!testIfFileExists(file)) {
      console.warn(("! Cannot find file: " + file).yellow);
      continue;
    }
    
    var lang = opts["language"];
    if (!lang) {
      lang = languageForFileAtPath(file);
    }
    
    if (!lang) {
      console.warn(("! Could not determine source language").yellow);
      continue;
    }
    
    var translationKeys = parseFile(file, lang);
    if (!translationKeys || translationKeys.length === 0) {
      continue;
    }
    
    var str = "";
    for (var j=0; j<translationKeys.length; j++) {
      var key = translationKeys[j];
      translationKeys[j] = {"key": key};
      var hash = key.id;
      if (sourceName) {
        allKeys.push(hash);
      }
    }
    str = JSON.stringify(translationKeys, null, prettyPrintSpaces);
    if (str.length > 2) {
      str = str.substring(1, str.length - 1);
    }
    
    writeStream.cork();
    if (wroteKeys) {
      writeStream.write(",");
    }
    
    if (translationKeys.length > 0) {
      wroteKeys = true;
    }
    
    writeStream.write(str);
    writeStream.uncork();
  }
  
  if (sourceName) {
    var sourceStruct = {"name": sourceName, "keys": allKeys};
    response["sources"] = [sourceStruct];
    responseStr = JSON.stringify(response, null, prettyPrintSpaces);
  }
  
  writeStream.write(responseStr.substring(splitIndex));
  if (writeStream !== process.stdout) {    
    writeStream.end("", "utf-8", function() {
      if (opts.accessToken) {
        console.warn(("> Uploading " + outputFile + "\n").yellow);
        postTranslationKeys(outputFile, function(response) {
          console.warn(JSON.stringify(response, null, 2).green);
        });
      }
    });
  }
}

var baseGrammar, baseSemantics;
main();
