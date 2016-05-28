(function() {

// Imports

  var Path = require('path');
  var Ohm = require('ohm-js');
  var FS = require('fs');
  var GSUtils = require('./utils.js');
  var GSGrammarUtils = require('./grammarUtils.js');
  var Logger = require(Path.join(__dirname, 'logger.js')).sharedLogger;
  var EventEmitter = require('events').EventEmitter;
  var inherits = require('inherits');

// Genstrings
  
  var ProgressEventName = "progress";
  
  /**
   * Genstrings
   * Provides interface to parsing out localizable strings from source code
   * with support for multiple languages.
   *
   * Main inteface is via parseFiles method.
   * Example:
   *   var gs = new Genstrings();
   *   gs.macro = "TMLLocalizedString"; // can have full Ohm grammar - i.e. "TMLLocalizedString|TMLLocalizedAttributedString"
   *   gs.language = "objc"; // genstrings detects language based on file extension, otherwise you can specify...
   *   gs.on('warning', function(message, info){}) // to catch warning events - these typically describe which statements are being ignored and why
   *   gs.on('progress', function(progress, file, translationKeys){}) // track progress and collect parsed translation keys
   *   gs.parseFiles(arrayOfFilePaths);
   *   
   */
  function Genstrings() {
  }
  
  inherits(Genstrings, EventEmitter);

  var ExtensionLanguageMap = GS_EXTENSION_LANGUAGE_MAP;
  var explicitLangs = {};
  for (var ext in ExtensionLanguageMap) {
    var lang = ExtensionLanguageMap[ext];
    explicitLangs[lang] = lang;
  }
  var MarkupLanguages = ["django", "backbone"];
  var Languages = MarkupLanguages.concat(Object.keys(explicitLangs)).sort();
  Genstrings.ExtensionLanguageMap = ExtensionLanguageMap;
  Genstrings.Languages = Languages;
  Genstrings.MarkupLanguages = MarkupLanguages;

  var supportedLanguages = null;
  Object.defineProperty(Genstrings, "supportedLanguages", {
    enumerable: true,
    configurable: false,
    get: function() {
      return Languages;
    }
  });

  /**
   * Will use specified language when parsing, instead of detecting based on extension
   */
  Genstrings.prototype.language = null;
  
  /**
   * Holds custom macro expression, overriding grammar's definition
   */
  Genstrings.prototype.macro = null;
  
  /**
   * Parses file for localized strings and returns an array of corresponding TranslationKey objects.
   * If you'd like to parse multiple files - use parseFiles method, which is re-entrant by nature,
   * and allows for atomic writes to disk within progress block...
   *
   * @param file - Path to file
   * @return Array of TranslationKey objects
   */
  Genstrings.prototype.parseFile = function parseFile(file) {
    var lang = this.language || GSGrammarUtils.languageForFileAtPath(file);
    if (!lang) {
      return null;
    }
    
    var TokenParser = require(Path.join(__dirname, "tokenParsers", "tokenParser.js"));
    var parser = TokenParser.parserForLanguage(lang);
    debugger;
    if (!parser) {
      Logger.error("Don't know how to parse " + lang + " language");
      return null;
    }
    if (this.macro) {
      parser.macro = this.macro;
    }
    
    var self = this;
    parser.on("warning", function(msg, info) {
      self.emit("warning", msg, info);
    });
    
    return parser.parseFile(file);
  };
  
  /**
   * Holds files to be processed (see parseFiles)
   */
  Genstrings.prototype.queue = null;
  Genstrings.prototype.currentQueueIndex = 0;
  
  /**
   * Indicates whether currently parsing files
   */
  Genstrings.prototype.running = false;
  
  /**
   * Parses multiple files.
   * This method will re-enter if there were keys found in currently processed file.
   * This allows for atomic writes to disk from within the progress block.
   *
   * Alternivately, you can use parseFile() in a loop...
   */
  Genstrings.prototype.parseFiles = function parseFiles(files) {
    if (this.parsing) {
      return;
    }

    var result = {};
    if (!(files instanceof Array)) {
      files = [files];
    }

    if (files.length === 0) {
      this.emit(ProgressEventName, 1, null, null);
      return;
    }

    this.queue = files;
    this.running = true;
    var self = this;
    this.processQueue(function(progress, file, translationKeys) {
      if (progress >= 1.0) {
        self.running = false;
      }
      self.emit(ProgressEventName, progress, file, translationKeys);
    });
    return this;
  };
  
  /**
   * Determines whether file at given path is a candidate for parsing
   */
  Genstrings.prototype.isFileCandidate = function isFileCandidate(file) {
    if (!GSUtils.fileExists(file)) {
      return false;
    }
    var lang = this.language || GSGrammarUtils.languageForFileAtPath(file);
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

    while (this.currentQueueIndex < queueLength && !this.isFileCandidate(file)) {
      this.currentQueueIndex++;
      progressBlock(this.currentQueueIndex / queueLength, file, null);
      if (this.currentQueueIndex >= queueLength) {
        return;
      }
      file = this.queue[this.currentQueueIndex];
    }

    var translationKeys = this.parseFile(file, lang);
    this.currentQueueIndex++;
    progressBlock(this.currentQueueIndex / queueLength, file, translationKeys);
    if (this.currentQueueIndex >= queueLength) {
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
