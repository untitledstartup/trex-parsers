#!/usr/bin/env node

/**
 * Program options and arguments
 */
var program = require('commander');

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
  var url = require('url');
  aUrl = url.parse(aUrl);
  
  var http = null;
  var port = null;
  if (aUrl.protocol == "https:") {
    http = require("https");
    port = 443;
  }
  else {
    http = require("http");
    port = 80;
  }
  
  var queryString = require('querystring');
  var postData = queryString.stringify(data);
  
  var options = {
    hostname: aUrl.host,
    port: port,
    path: aUrl.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };
  
  debugger;
  var req = http.request(options, function(response){
    response.setEncoding('utf8');
    var responseText = "";
    response.on('data', function(chunk) {
      debugger;
      responseText += chunk;
    });
    response.on('end', function() {
      debugger;
      console.log('No more data in response.')
    });
  });

  req.on('error', function(e){
    debugger;
    console.log("Error uploading translation keys: " + e.message);
  });

  // write data to request body
  req.write(postData);
  req.end();
}

function postTranslationKeys(translationKeys) {
  var accessToken = opts.accessToken;
  if (!accessToken) {
    console.error("No valid access token provided");
  }
  
  var host = opts.host ? opts.host : "api.translationexchange.com";
  if (host.indexOf("http") !== 0) {
    host = "https://" + host;
  }
  var url = host+"/v1/projects/current/import";
  
  var payload = (typeof translationKeys == 'string') ? payload : JSON.stringify(translationKeys);
  var data = {
    "file": payload,
    "realtime": false,
    "access_token": accessToken
  };
  
  postData(url, data);
}

function main() {  
  var outputFile = opts.outputFile;
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
  
  for (var i=0; i<files.length; i++) {
    var file = files[i];
    
    if (!testIfFileExists(file)) {
      console.warn("Cannot find file: " + file);
      continue;
    }
    
    var lang = opts["language"];
    if (!lang) {
      lang = languageForFileAtPath(file);
    }
    
    if (!lang) {
      console.warn("Could not determine source language");
      continue;
    }
    
    var translationKeys = parseFile(file, lang);
    if (!translationKeys || translationKeys.length === 0) {
      continue;
    }
    if (opts.accessToken) {
      response.translation_memory = response.translation_memory.concat(translationKeys);
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
    if (i > 0) {
      writeStream.write(",");
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
    writeStream.end();
  }
  
  if (opts.accessToken) {
    postTranslationKeys(response);
  }
}

var baseGrammar, baseSemantics;
main();
