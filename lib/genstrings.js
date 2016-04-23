(function() {
  
// Imports
  
  var Path = require('path');
  var Ohm = require('ohm-js');
  var FS = require('fs');
  var GenstringUtils = require('./genstringUtils.js');
  
// Globals
  
  var DEFAULT_ENCODING = 'utf8';
  
// Supported languages & file extensions
  
  var ExtensionLanguageMap = {
    "m": "objc",
    "swift": "swift",
    "html": "html",
    "htm": "html",
    "js": "js",
    "jsp": "jsp",
    "java": "java"
  };
  
// Grammars
  
  var GrammarNamespace = {};
  
  /** 
   * Returns Ohm Grammar for given language
   */
  function grammarForLanguage(lang) {
    var grammarName = lang.substring(0, 1).toUpperCase() + lang.substring(1);
    var grammar = GrammarNamespace[grammarName];
    if (!grammar) {
      var grammarFilePath = grammarFilePathForLanguage(lang);
      var grammarText = FS.readFileSync(grammarFilePath, DEFAULT_ENCODING);
      grammar = Ohm.grammar(grammarText, GrammarNamespace);
      GrammarNamespace[grammarName] = grammar;
    }
    return grammar;
  }
  /**
   * Returns file containing Ohm Grammar definition for given language
   */
  function grammarFilePathForLanguage(lang) {
    return Path.resolve(__dirname, "../grammar/" + lang + ".ohm");
  };
  
// Semantics

  var baseSemantics = null;
  function loadBaseSemantics() {
    var baseGrammar = grammarForLanguage("base");
    baseSemantics = baseGrammar.semantics();
    loadSemanticsData(baseSemantics, getSemanticsDataForLanguage("base"));
  }
  
  /**
   * Returns path to semantics file for given language
   */
  function semanticsFilePathForLanguage(lang) {
    return Path.resolve(__dirname, "../semantics/" + lang + ".js");
  }
  /**
   * Returns object containing semantics for Ohm Grammar, for a given language
   */
  function getSemanticsDataForLanguage(lang) {
    var semanticsFilePath = semanticsFilePathForLanguage(lang);
    var description = require(semanticsFilePath);
    return description;
  }
  /**
   * Loads semantics data.
   * The data object is expected to have one of the two keys: 'operations' and 'attributes',
   * each defining corresponsing sematics...
   *
   * @param semantics - Ohm Semantics (grammar.semantics())
   * @param data - Semantics data
   */
  function loadSemanticsData(semantics, data) {
    var superSemantics = semantics._getSemantics().super;
    var superOperations = (superSemantics) ? superSemantics.operations : {};
    var superAttributes = (superSemantics) ? superSemantics.attributes : {};
    var operations = data["operations"];
    if (operations) {
      for (var operationName in operations) {
        if (superOperations[operationName]) {
          semantics.extendOperation(operationName, operations[operationName]);
        } else {
          semantics.addOperation(operationName, operations[operationName]);
        }
      }
    }
    var attributes = data["attributes"];
    if (attributes) {
      for (var attrName in attributes) {
        if (superAttributes[attrName]) {
          semantics.extendAttribute(attrName, attributes[attrName]);
        } else {
          semantics.addAttribute(attrName, attributes[attrName]);
        }
      }
    }
  }
  
// Language detection
  
  function languageForFileAtPath(filePath) {
    var extension = Path.extname(filePath).substring(1).toLowerCase();
    return ExtensionLanguageMap[extension];
  };
  
// Genstrings
  
  function Genstrings() {
    this.init();
  }
  
  Genstrings.ExtensionLanguageMap = ExtensionLanguageMap;
  
  var supportedLanguages = null;
  Object.defineProperty(Genstrings, "supportedLanguages", {
    enumerable: true,
    configurable: false,
    get: function() {
      if (!supportedLanguages) {
        var map = this.ExtensionLanguageMap;
        var results = {};
        for (var ext in map) {
          var lang = map[ext];
          results[lang] = lang;
        }
        supportedLanguages = Object.keys(results);
      }
      return supportedLanguages;
    }
  });
  
  Genstrings.prototype.init = function init() {
    // pre-load Base grammar
    // TODO: loading higher grammar should preload supergrammars, then we wouldn't need to do this at all
    if (!baseSemantics) {
      loadBaseSemantics();
    }
  };
  
  /**
   * Will use specified language when parsing, instead of detecting based on extension
   */
  Genstrings.prototype.language = null;
  /**
   * Holds custom macro expression, overriding grammar's definition
   */
  Genstrings.prototype.macro = null;
  /**
   * When enabled, will cause Genstrings to dump trace log from Ohm
   */
  Genstrings.prototype.traceEnabled = false;
  /**
   * Parses file for localized strings and returns an array of corresponding TranslationKey objects.
   * If you'd like to parse multiple files - use parseFiles method, whic is re-entrant by nature,
   * which allows for atomic writes to disk within progress block...
   *
   * @param file - Path to file
   * @return Array of TranslationKey objects
   */
  Genstrings.prototype.parseFile = function parseFile(file) {
    var lang = this.language || languageForFileAtPath(file);
    if (!lang) {
      return null;
    }
    var grammar = grammarForLanguage(lang);
    if (this.macro) {
      var macros = this.macro.split("|");
      for (var i = 0; i < macros.length; i++) {
        macros[i] = JSON.stringify(macros[i]);
      }
      var runtimeGrammarText = "Runtime <: " + grammar.name + " { macro := " + macros.join("|") + " }";
      grammar = Ohm.grammar(runtimeGrammarText, GrammarNamespace);
    }
    var source = FS.readFileSync(file, DEFAULT_ENCODING);

    if (this.traceEnabled) {
      logInfo(grammar.trace(source).toString().replace(/\\n/g, "\n"));
    }
    var match = grammar.match(source);

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
    } else {
      translationKeys = null;
    }
    return translationKeys;
  };

  /**
   * Holds files to be processed (see parseFiles)
   */
  Genstrings.prototype.queue = null;
  /**
   * Indicates whether currently parsing files
   */
  Genstrings.prototype.running = false;
  Genstrings.prototype.currentQueueIndex = 0;
  /**
   * Parses multiple files.
   * This method will re-enter if there were keys found in currently processed file.
   * This allows for atomic writes to disk from within the progress block.
   *
   * Alternivately, you can use parseFile() in a loop...
   */
  Genstrings.prototype.parseFiles = function parseFiles(files, progressBlock) {
    if (this.parsing) {
      return;
    }
    
    var result = {};
    if (!(files instanceof Array)) {
      files = [files];
    }
    
    if (files.length === 0) {
      if (typeof progressBlock == 'function') {
        progressBlock(1, null, null);
      }
      return;
    }
    
    this.queue = files;
    this.running = true;
    var self = this;
    this.processQueue(function(progress, file, translationKeys) {
      if (progress >= 1.0) {
        self.running = false;
      }
      if (typeof progressBlock == 'function') {
        progressBlock(progress, file, translationKeys);
      }
    });
  };
  Genstrings.prototype.isFileCandidate = function isFileCandidate(file) {
    if (!GenstringUtils.fileExists(file)) {
      return false;
    }
    var lang = this.language || languageForFileAtPath(file);
    if (!lang) {
      return false;
    }
    return true;
  };
  /**
   * Does the actual processing of the pending queue
   */
  Genstrings.prototype.processQueue = function processQueue(progressBlock) {
    var queue = this.queue;
    var file = queue[this.currentQueueIndex];
    var lang = this.language;
    var queueLength = queue.length;
    
    while(this.currentQueueIndex < queueLength && !this.isFileCandidate(file)) {
      this.currentQueueIndex++;
      progressBlock(this.currentQueueIndex/queueLength, file, null);
      if (this.currentQueueIndex >= queueLength) {
        return;
      }
      file = this.queue[this.currentQueueIndex];
    }
    
    var translationKeys = this.parseFile(file, lang);
    this.currentQueueIndex++;
    progressBlock(this.currentQueueIndex/queueLength, file, translationKeys);
    if (this.currentQueueIndex >=  queueLength) {
      return;
    }
    var self = this;
    setTimeout(function() {
      self.processQueue(progressBlock);
    }, 0);
  };


// Exports
  
  module.exports = Genstrings;
  
})()