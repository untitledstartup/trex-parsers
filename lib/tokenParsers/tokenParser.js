(function(){
  var Path = require('path');
  var FS = require('fs');
  var EventEmitter = require('events').EventEmitter;
  var inherits = require('inherits');
  var Genstrings = require(Path.join(Path.dirname(__dirname), "genstrings.js"));
  var GrammarUtils = require(Path.join(Path.dirname(__dirname), "grammarUtils.js"));
  var GSUtils = require(Path.join(Path.dirname(__dirname), "utils.js"));
  var TokenArray = require(Path.join(__dirname, "tokenArray"));
  debugger;
  
// Helpers
  
  function parserClassNameForLanguage(lang) {
    var prefix = lang.substring(0,1).toLowerCase();
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
  
  TokenParser.TokenArray = TokenArray;
  
  TokenParser.parserForLanguage = function (lang) {
    var className = parserClassNameForLanguage(lang);
    var sourcePath = Path.join(__dirname, className + ".js");
    var markupLangs = Genstrings.MarkupLanguages;
    var parserConstructor = null;
    
    if (!GSUtils.fileExists(sourcePath) && markupLangs.indexOf(lang) >= 0) {
      sourcePath = Path.join(__dirname, "markupTokenParser.js");
    }
    
    if (GSUtils.fileExists(sourcePath)) {
      parserConstructor = require(sourcePath);
    }
    else {
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
  TokenParser.prototype.fileName = null;
  TokenParser.prototype.source = null;
  TokenParser.prototype._matches = null;
  TokenParser.prototype._translationKeys = null;
  
  TokenParser.prototype.createMatch = function (macro, label, description) {
    var m = new Match(macro, label, description);
    return m;
  };
  
  TokenParser.prototype.parseFile = function parseFile(file, encoding) {
    this.fileName = file;
    var enc = (encoding) ? encoding : GS_DEFAULT_ENCODING;
    this.source = FS.readFileSync(file, enc);
    return this._parse();
  };
  TokenParser.prototype.parseString = function parseString(str) {
    this.fileName = null;
    this.source = str;
    return this._parse();
  };
  TokenParser.prototype._parse = function() {
    if (!this.grammar) {
      this.loadGrammar();
    }
    
    var str = this.source;
    var grammar = this.grammar;
    this._matches = [];
    this._translationKeys = [];
    var match = grammar.match(str, "Tokens");
    debugger;
    
    if (match.succeeded()) {
      var semantics = GrammarUtils.semanticsForGrammar(grammar);
      var matchSemantics = semantics(match);
      var tokens = matchSemantics.tokens;
      debugger;
      if (tokens && tokens.length > 0) {
        tokens = tokens.flatten();
        var tokenArray = new TokenArray(tokens);
        this.processTokens(tokenArray);
      }
    }
    
    return [].concat(this._translationKeys);
  };
  
  TokenParser.prototype.loadGrammar = function() {
    var grammar = GrammarUtils.grammarForLanguage(this.language);
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
  
  TokenParser.prototype.skipToToken = function (iterator, token) {
    var t = null;
    while ((t = iterator.next())) {
      var shouldBreak = false;
      if (token.type != undefined && token.value != undefined) {
        shouldBreak = t.type == token.type && t.value == t.value;
      }
      else if (token.type != undefined) {
        shouldBreak = t.type == token.type;
      }
      else if (token.value != undefined) {
        shouldBreak = t.value == token.value;
      }
      if (shouldBreak) {
        break;
      }
    }
  };
  
  TokenParser.prototype.processString = function (str) {
    return str.replace(/\\(.)/g, "$1");
  };
  
  TokenParser.prototype.warn = function warn(msg, description) {
    if (description) {
      description.file = this.fileName;
    }
    this.emit("warning", msg, description);
  };
  
  TokenParser.prototype.informInterpolatedString = function informInterpolatedString(token) {
    var interpNode = null;
    try {
      GSUtils.iterateNodes(token.node, function(node) {
        if (node.ctorName == "stringInterpolation" || node.ctorName.indexOf("stringInterpolation_") === 0) {
          interpNode = node;
          throw new Error("Done");
        }
      });
    }
    catch(e){
    }
    debugger;
    var description = null;
    if (interpNode) {
      description = GSUtils.debugDescriptionForNode(interpNode);
    }
    else {
      description = GSUtils.debugDescriptionForNode(token.node);
    }
    this.warn("String interpolation", description);
  };
  TokenParser.prototype.informStringConstruction = function informStringConstruction(token) {
    var description = GSUtils.debugDescriptionForNode(token.node);
    this.warn("Dynamic string construction", description);
  };
  TokenParser.prototype.informDynamicMacro = function informDynamicMacro(token) {
    var description = GSUtils.debugDescriptionForNode(token.node);
    this.warn("Dynamic macro", description);
  };
  
  
  TokenParser.prototype.onUnexpectedToken = function onUnexpectedToken(token) {
    this.informStringConstruction(token);
  };
  
  
  TokenParser.prototype.processTokens = function processTokens(tokens) {
    var grammar = this.grammar;
    var i = tokens.iterator;
    var token = null;
    while ((token = i.next())) {
      
      if (token.type == "macro") {
        var macro = token.value;
    
        // make sure macro is followed by "(" operator
        token = i.next();
        if (token.type == "openExpressionOperator" && token.value == "(") {
          token = i.next();
          var next = i.peek();
          if (token.type == "string" 
            && next 
            && next.type != "closeExpressionOperator" 
            && (next.type != "operator" || next.value != ",") ) {
              this.informStringConstruction(next);
          }
          else if (token.type == "string" && token.value.trim().length > 0) {
            var newMatch = this.createMatch(macro);
            newMatch.label = this.processString(token.value);
            this.pushMatch(newMatch);
          }
          else if (token.type == "interpolatedString") {
            this.informInterpolatedString(token);
          }
          else if (token.type != "closeExpressionOperator") {
            this.onUnexpectedToken(token);
          }
        }
      }
      else if (token.type == "dynamicMacro") {
        this.informDynamicMacro(token);
      }
      else if (token.type == "string") {
        var currentMatch = this.getCurrentMatch();
        if (currentMatch && currentMatch.ignoreCount === 0) {
          if (!currentMatch.label) {
            currentMatch.label = this.processString(token.value);
          }
          else if (!currentMatch.description) {
            currentMatch.description = this.processString(token.value);
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
    }
  };
  
  
// Exports
  
  module.exports = TokenParser;
  
})()