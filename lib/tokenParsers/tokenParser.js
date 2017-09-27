(function(){
  var GS_DEFAULT_ENCODING = 'utf8'; // NOTE: This is needed because defines.js is not working

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
    //console.log('  toTranslationKey: ' + JSON.stringify(key));
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

// Parsing

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

// Grammar

  TokenParser.prototype.subclassGrammarWithRules = function (grammar, newGrammarName, rules) {
    var ruleStr = "";
    for (var ruleName in rules) {
      var rule = rules[ruleName];
      var parts = rule.split("|");
      for (var i = 0; i < parts.length; i++) {
        parts[i] = JSON.stringify(parts[i]);
      }
      ruleStr += "\n" + ruleName + " := " + parts.join("|") + "\n";
    }
    grammar = GrammarUtils.subclassGrammar(grammar, newGrammarName, ruleStr);
    return grammar;
  };
  TokenParser.prototype.loadGrammar = function() {
    var grammar = GrammarUtils.grammarForLanguage(this.language);
    var macro = this.macro;
    if (macro) {
      grammar = this.subclassGrammarWithRules(grammar, "Runtime", {"macro": macro});
    }
    this.grammar = grammar;
  };

// Matches

  TokenParser.prototype.createMatch = function (macro, label, description) {
    var m = new Match(macro, label, description);
    return m;
  };
  TokenParser.prototype.pushMatch = function pushMatch(match) {
    //console.log('. pushing match: ' + JSON.stringify(match));
    this._matches.push(match);
  };
  TokenParser.prototype.popMatch = function popPatch() {
    return this._matches.pop();
  };
  TokenParser.prototype.getCurrentMatch = function getCurrentMatch() {
    //console.log(JSON.stringify(this._matches));
    return this._matches[this._matches.length-1];
  };
  TokenParser.prototype.pushTranslationKey = function pushTranslationKey(key) {
    this._translationKeys.push(key);
  };

// Parsing helpers

  TokenParser.prototype.skipToToken = function skipToToken(iterator, token) {
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
  TokenParser.prototype.scanTokens = function scanTokens(i, callback) {
    var count = 0;
    function reset() {
      i.previous(count-1);
    }
    while (!i.atEnd()) {
      var token = i.next();
      count++;
      if (!callback(count, token, reset)) {
        break;
      }
    }
  };
  TokenParser.prototype.processString = function (str) {
    return str.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\(.)/g, "$1");
  };

// Warnings

  TokenParser.prototype.warn = function warn(msg, description) {
    if (description) {
      description.file = this.fileName;
    }
    this.emit("warning", msg, description);
  };

// Handling special constructs

  TokenParser.prototype.onInterpolatedString = function onInterpolatedString(token) {
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

    var description = null;
    if (interpNode) {
      description = GSUtils.debugDescriptionForNode(interpNode);
    }
    else {
      description = GSUtils.debugDescriptionForNode(token.node);
    }
    this.warn("String interpolation", description);
  };
  TokenParser.prototype.onStringConstruction = function onStringConstruction(token) {
    var description = GSUtils.debugDescriptionForNode(token.node);
    this.warn("Dynamic string construction", description);
  };
  TokenParser.prototype.onDynamicMacro = function onDynamicMacro(token) {
    var description = GSUtils.debugDescriptionForNode(token.node);
    this.warn("Dynamic macro", description);
  };
  TokenParser.prototype.onUnexpectedToken = function onUnexpectedToken(token) {
    console.log('. Unexpected Token: ' + token);
    this.onStringConstruction(token);
  };

// Processing tokens

  TokenParser.prototype.onMacroArgument = function on_macroArgument(token, i) {
    var next = i.peek();
    var match = this.getCurrentMatch();
    if (!match || match.ignoreCount > 0) {
      return;
    }

    if (token.type == "string"
      && next
      && next.type != "closeExpressionOperator"
      && next.type != "argumentSeparatingOperator" ) {
        this.onStringConstruction(next);
    }
    else if (token.type == "string" && token.value.trim().length > 0) {
      var value = this.processString(token.value);
      if (!match.label) {
        match.label = value;
      }
      else if (!match.description) {
        match.description = value;
      }
    }
    else if (token.type == "interpolatedString") {
      this.onInterpolatedString(token);
    }
  };

  TokenParser.prototype.on_macro = function on_macro(token, i) {
    var macro = token.value;

    // make sure macro is followed by openExpressionOperator
    // token = i.next();
    // if (!token || token.type != "openExpressionOperator") {
    //   console.log('  Canceling ' + macro + ' because the next token is not an openExpressionOperator');
    //   return;
    // }

    // make sure first argument is a string
    token = i.next();
    if (token.type != "string" && token.type != "interpolatedString") {
      this.onUnexpectedToken(token);
      return;
    }

    var newMatch = this.createMatch(macro);
    this.pushMatch(newMatch);

    this.onMacroArgument(token, i);
  };
  TokenParser.prototype.on_dynamicMacro = function on_dynamicMacro(token, i) {
    this.onDynamicMacro(token);
  };
  TokenParser.prototype.on_string = function on_string(token, i) {
    var currentMatch = this.getCurrentMatch();
    if (!currentMatch) {
      console.log('  Rejected ' + token.value + ' because it is not a string');
      return;
    }
    console.log('  Found String: ' + token.value);
    this.onMacroArgument(token, i);
  };
  TokenParser.prototype.on_openExpressionOperator = function on_openExpressionOperator(token, i) {
    var currentMatch = this.getCurrentMatch();
    if (currentMatch) {
      currentMatch.ignoreCount++;
      console.log('  New Expression: ' + JSON.stringify(currentMatch));
    }
  };
  TokenParser.prototype.on_closeExpressionOperator = function on_closeExpressionOperator(token, i) {
    var currentMatch = this.getCurrentMatch();
    if (currentMatch) {
      console.log('  Testing ' + JSON.stringify(currentMatch) + '...');
      if (currentMatch.ignoreCount === 0) { // && token.value == ")") {
        var match = this.popMatch();
        if (match.label) {
          newTranslationKey = match.toTranslationKey();
          this.pushTranslationKey(match.toTranslationKey());
          console.log('  ...ACCEPTED!'); // + JSON.stringify(newTranslationKey));
        }
      }
      else {
        currentMatch.ignoreCount--;
        console.log('  Rejected ' + JSON.stringify(currentMatch) + ' because...');
      }
    }
  };


  TokenParser.prototype.processTokens = function processTokens(tokens) {
    var grammar = this.grammar;
    var i = tokens.iterator;
    var token = null;
    while (!i.atEnd()) {
      token = i.next();
      //console.log(token.value);
      // debugger;
      var handler = token.type;
      handler = "on_" + handler;
      if (typeof this[handler] == 'function') {
        this[handler](token, i);
      }
    }
  };


// Exports

  module.exports = TokenParser;

})()
