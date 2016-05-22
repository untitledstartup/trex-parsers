(function(){
  var inherits = require('inherits');
  var EventEmitter = require('events').EventEmitter;
  var Path = require('path');
  var Logger = require(Path.join(__dirname, "logger.js")).sharedLogger;
  var GrammarUtils = require(Path.join(__dirname, "grammarUtils.js"));
  var GSUtils = require(Path.join(__dirname, "utils.js"));
  
// Helpers
  
  function parserClassNameForLanguage(lang) {
    var prefix = lang.substring(0,1).toUpperCase();
    if (lang.length > 1) {
      prefix += lang.substring(1);
    }
    return prefix + "TokenParser";
  }
  
// Match
  
  function Match(macro, label, description) {
    this.macro = macro;
    this.label = label;
    this.description = description;
  }
  Match.prototype.macro = null;
  Match.prototype.label = null;
  Match.prototype.description = null;
  Match.prototype.ignoreCount = 0;
  Match.prototype.toTranslationKey = function toTranslationKey() {
    var key = GSUtils.createTranslationKey(this.label, this.description);
    return key;
  };
  
// TokenParser
  
  function TokenParser() {
  }
  
  inherits(TokenParser, EventEmitter);
  
  TokenParser.parserForLanguage = function (lang) {
    var className = parserClassNameForLanguage(lang);
    var parserConstructor = null;
    try {
      parserConstructor = require(className);
    }
    catch(e) {
      // Logger.info("Did not find specialized parser for '"+lang+"' language");
    }
    if (!parserConstructor) {
      parserConstructor = TokenParser;
    }
    var instance = new parserConstructor();
    if (!instance.language) {
      instance.language = lang;
    }
    return instance;
  };
  
  TokenParser.prototype.macro = null;
  TokenParser.prototype.grammar = null;
  
  TokenParser.prototype.parse = function(str) {
    if (!this.grammar) {
      this.loadGrammar();
    }
    
    var grammar = this.grammar;
    this._matches = [];
    this._translationKeys = [];
    var match = grammar.match(str, "Tokens");
    
    if (match.succeeded()) {
      debugger;
      var semantics = GrammarUtils.semanticsForGrammar(grammar);
      var matchSemantics = semantics(match);
      var tokens = matchSemantics.tokens;
      this.processTokens(tokens);
    }
    
    return [].concat(this._translationKeys);
  };
  
  TokenParser.prototype.loadGrammar = function() {
    var grammar = GrammarUtils.grammarForLanguage(this.language);
    debugger;
    var macro = this.macro;
    if (macro) {
      var macros = macro.split("|");
      for (var i = 0; i < macros.length; i++) {
        macros[i] = JSON.stringify(macros[i]);
      }
      grammar = GrammarUtils.subclassGrammar(grammar, "Runtime", "macro := " + macros.join("|"));
    }
    this.grammar = grammar;
  };
  
  TokenParser.prototype._matches = null;
  TokenParser.prototype._translationKeys = null;
  TokenParser.prototype.pushMatch = function pushMatch(match) {
    this._matches.push(match);
  };
  TokenParser.prototype.popMatch = function popPatch() {
    return this._matches.pop();
  };
  TokenParser.prototype.getCurrentMatch = function getCurrentMatch() {
    return this._matches[this._matches.length-1];
  };
  TokenParser.prototype.pushTranslationKey = function pushTranslationKey(key) {
    this._translationKeys.push(key);
  };
  
  TokenParser.prototype.processTokens = function processTokens(tokens) {
    var i = 0;
    var grammar = this.grammar;
    
    debugger;
    while (i < tokens.length) {
      var token = tokens[i];
      
      if (token.type == "namedToken") {
        // check if namedToken matches our macro
        var match = grammar.match(token.value, "macro");
        if (match.succeeded()) {
          var macro = token.value;
          
          // make sure macro is followed by "(" operator
          token = tokens[++i];
          if (token.type == "openExpressionOperator" && token.value == "(") {
            token = tokens[++i];
            if (token.type == "string" && token.value.trim().length > 0) {
              var newMatch = new Match(macro);
              newMatch.label = token.value;
              this.pushMatch(newMatch);
            }
          }
        }
      }
      else if (token.type == "string") {
        var currentMatch = this.getCurrentMatch();
        if (currentMatch && currentMatch.ignoreCount === 0) {
          if (!currentMatch.label) {
            currentMatch.label = token.value;
          }
          else if (!currentMatch.description) {
            currentMatch.description = token.value;
          }
        }
      }
      else if (token.type == "openExpressionOperator") {
        var currentMatch = this.getCurrentMatch();
        if (currentMatch) {
          currentMatch.ignoreCount++;
        }
      }
      else if (token.type == "closeExpressionOperator") {
        var currentMatch = this.getCurrentMatch();
        if (currentMatch) {
          if (currentMatch.ignoreCount === 0 && token.value == ")") {
            var match = this.popMatch();
            if (match.label) {              
              this.pushTranslationKey(match.toTranslationKey());
            }
          }
          else {
            currentMatch.ignoreCount--;
          }
        }
      }
      
      i++;
      continue;
    }
  };
  
  
// Exports
  
  module.exports = TokenParser;
  
})()