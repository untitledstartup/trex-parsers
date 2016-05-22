(function(){
  
  var FS = require('fs');
  var Path = require('path');
  var Ohm = require('ohm-js');
  var Logger = require(Path.join(__dirname, 'logger.js')).sharedLogger;
  
  var GrammarNamespace = {};
  global['GrammarNamespace'] = GrammarNamespace;
  
  var GlobalSemantics = {};
  global['GlobalSemantics'] = GlobalSemantics;
  
  var GrammarUtils = {
    /** 
     * Returns Ohm Grammar for given language
     */
    grammarForLanguage: function grammarForLanguage(lang) {
      var grammarName = lang.substring(0, 1).toUpperCase() + lang.substring(1);
      var grammar = GrammarNamespace[grammarName];
      if (!grammar) {
        var grammarFilePath = this.grammarFilePathForLanguage(lang);
        var grammarText = FS.readFileSync(grammarFilePath, GS_DEFAULT_ENCODING);
        grammar = Ohm.grammar(grammarText, GrammarNamespace);
        GrammarNamespace[grammarName] = grammar;
      }
      return grammar;
    },
    /**
     * "Subclasses" given Ohm Grammar object, with given name and rules
     */
    subclassGrammar: function (grammar, subgrammarName, rules) {
      debugger;
      var rulesArray = (rules instanceof Array) ? rules : [rules];
      var newGrammarString = subgrammarName + " <: " + grammar.name + " { " + rulesArray.join("\n\n") + " }";
      delete GrammarNamespace[subgrammarName];
      delete GlobalSemantics[subgrammarName];
      var newGrammar = Ohm.grammar(newGrammarString, GrammarNamespace);
      return newGrammar;
    },
    /**
     * Return semantics for named grammar
     */
    semanticsForGrammar: function (grammar) {
      var semantics = GlobalSemantics[grammar.name];
      if (!semantics) {
        var superName = grammar.superGrammar.name;
        if (superName.indexOf('BuiltInRules') >= 0) {          
          semantics = grammar.semantics();
        }
        else {
          var baseSemantics = this.semanticsForGrammar(grammar.superGrammar);
          semantics = grammar.extendSemantics(baseSemantics);
        }
        this.loadSemanticsDataForLanguage(semantics, grammar.name.toLowerCase());
        GlobalSemantics[grammar.name] = semantics;
      }
      return semantics;
    },
    /**
     * Returns file containing Ohm Grammar definition for given language
     */
    grammarFilePathForLanguage: function grammarFilePathForLanguage(lang) {
      return Path.resolve(__dirname, "../grammar/" + lang + ".ohm");
    },
    /**
     * Returns path to semantics file for given language
     */
    semanticsFilePathForLanguage: function semanticsFilePathForLanguage(lang) {
      return Path.resolve(__dirname, "../semantics/" + lang + ".js");
    },
    /**
     * Returns object containing semantics for Ohm Grammar, for a given language
     */
    getSemanticsDataForLanguage: function getSemanticsDataForLanguage(lang) {
      var semanticsFilePath = this.semanticsFilePathForLanguage(lang);
      var description;
      try {
        description = require(semanticsFilePath);
      }
      catch(e) {
        Logger.log("Failed to load semantics data from '" + semanticsFilePath + "': " + e);
      }
      return description;
    },
    /**
     * Locates and loads semantics data for given language.
     */
    loadSemanticsDataForLanguage: function (semantics, lang) {
      var data = this.getSemanticsDataForLanguage(lang);
      debugger;
      if (data) {
        this.loadSemanticsData(semantics, data);
      }
    },
    /**
     * Loads semantics data.
     * The data object is expected to have one of the two keys: 'operations' and 'attributes',
     * each defining corresponsing sematics...
     *
     * @param semantics - Ohm Semantics (grammar.semantics())
     * @param data - Semantics data
     */
    loadSemanticsData: function loadSemanticsData(semantics, data) {
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
    },
    /**
     * Determines language for giveni file path
     */
    languageForFileAtPath: function languageForFileAtPath(filePath) {
      var extension = Path.extname(filePath).substring(1).toLowerCase();
      return GS_EXTENSION_LANGUAGE_MAP[extension];
    }
  };
  
  module.exports = GrammarUtils;
  
})()