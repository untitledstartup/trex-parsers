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
  "java": "java"
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
  var superSemantics = semantics._getSemantics().super;
  var superOperations = (superSemantics) ? superSemantics.operations : {};
  var superAttributes = (superSemantics) ? superSemantics.attributes : {};
  var operations = data["operations"];
  if (operations) {
    for (var operationName in operations) {
      if (superOperations[operationName]) {
        semantics.extendOperation(operationName, operations[operationName]);
      }
      else {        
        semantics.addOperation(operationName, operations[operationName]);
      }
    }
  }
  var attributes = data["attributes"];
  if (attributes) {
    for (var attrName in attributes) {
      if (superAttributes[attrName]) {
        semantics.extendAttribute(attrName, attributes[attrName]);
      }
      else {        
        semantics.addAttribute(attrName, attributes[attrName]);
      }
    }
  }
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
    var runtimeGrammarText = "Runtime <: " + grammar.name + " { Macro := "+macros.join("|")+" }";
    debugger;
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
    if (match.succeeded()) {
      console.warn("> Found Matches in " + file + " (" + duration + "ms)");
    }
    else {
      console.warn("< No matches found in : " + file + "(" + duration + "ms)");
    }
  }
  if (!match.succeeded()) {
    return null;
  }
  
  var semanticData = getSemanticsDataForLanguage(lang);
  var semantics = grammar.extendSemantics(baseSemantics);
  loadSemanticsData(semantics, semanticData);
  var matchSemantics = semantics(match);
  var translationKeys = matchSemantics.translationKeys;
  
  return translationKeys;
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
    
    var str = "";
    for (var j=0; j<translationKeys.length; j++) {
      var key = translationKeys[j];
      translationKeys[j] = {"key": key};
      if (sourceName) {
        allKeys.push(hash);
      }
    }
    str = JSON.stringify(translationKeys, null, prettyPrintSpaces);
    if (str.length > 2) {
      str = str.substring(1, str.length - 1);
    }
    
    writeStream.cork();
    writeStream.write(str);
    if (i<files.length-1) {
      writeStream.write(",");
    }
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
}

var baseGrammar, baseSemantics;
main();
