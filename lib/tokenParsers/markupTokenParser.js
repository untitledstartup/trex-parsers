(function(){
  var inherits = require('inherits');
  var Path = require('path');
  var XMLTokenParser = require(Path.join(__dirname, 'xmlTokenParser'));
  var Utils = require(Path.join(Path.dirname(__dirname), 'utils'));
  var GrammarUtils = require(Path.join(Path.dirname(__dirname), 'grammarUtils'));
  var TokenArray = require(Path.join(__dirname, "tokenArray"));
  var TokenParser = require(Path.join(__dirname, "tokenParser"));
  
  function MarkupTokenParser(parser) {
    var tokenParser = null;
    if (parser instanceof TokenParser) {
      tokenParser = parser;
    }
    else {
      tokenParser = new TokenParser();
      tokenParser.language = "base";
    }
    var self = this;
    tokenParser.on("warning", function(message, info) {
      self.emit("warning", message, info);
    });
    this.tokenParser = tokenParser;
    this.language = "markup";
  }
  
  inherits(MarkupTokenParser, XMLTokenParser);
  
  /**
   * Holds instanceof TokenParser that's to be used in parsing contents of special markup
   */
  MarkupTokenParser.prototype.tokenParser = null;
  /**
   * Overrides rule definitions for open and close markup (which defaults to <% %> style markup)
   */
  MarkupTokenParser.prototype.openMarkup = null;
  MarkupTokenParser.prototype.closeMarkup = null;
  
  MarkupTokenParser.prototype.loadGrammar = function() {
    debugger;
    this.constructor.super_.prototype.loadGrammar.apply(this, []);
    if (this.openMarkup || this.closeMarkup) {      
      var grammar = this.grammar;
      var rules = {};
      if (this.openMarkup) {
        rules["stringInterpolationStart"] = this.openMarkup;
      }
      if (this.closeMarkup) {
        rules["stringInterpolationEnd"] = this.closeMarkup;
      }
      grammar = this.subclassGrammarWithRules(grammar, "RuntimeMarkup", rules);
      this.grammar = grammar;
    }
  };
  
  MarkupTokenParser.prototype.processString = function (str) {
    return str.replace(/\\/g, "");
  };
  
  MarkupTokenParser.prototype.on_stringInterpolation = function (token, i) {
    this.processInterpolatedString(token.value);
  };
  
  MarkupTokenParser.prototype.on_interpolatedString = function (token, i) {
    var self = this;
    Utils.iterateNodes(token.node, function(n) {
      if (n.ctorName == "stringInterpolation") {
        self.processInterpolatedString(n.interval.contents);
      }
    });
  };
  MarkupTokenParser.prototype.processInterpolatedString = function (str) {
    var parser = this.tokenParser;
    parser.macro = this.macro;
    var keys = parser.parseString(str);
    if (keys && keys.length > 0) {
      this._translationKeys = this._translationKeys.concat(keys);
    }
  };
  
  
  
  module.exports = MarkupTokenParser;
})()