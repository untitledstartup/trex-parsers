(function(){
  var inherits = require('inherits');
  var Path = require('path');
  var XMLTokenParser = require(Path.join(__dirname, 'xmlTokenParser'));
  var Utils = require(Path.join(Path.dirname(__dirname), 'utils'));
  var GrammarUtils = require(Path.join(Path.dirname(__dirname), 'grammarUtils'));
  var TokenArray = require(Path.join(__dirname, "tokenArray"));
  var TokenParser = require(Path.join(__dirname, "tokenParser"));
  
  function MarkupTokenParser() {
    var tokenParser = new TokenParser();
    tokenParser.language = "base";
    var self = this;
    tokenParser.on("warning", function(message, info) {
      self.emit("warning", message, info);
    });
    this.tokenParser = tokenParser;
  }
  
  inherits(MarkupTokenParser, XMLTokenParser);
  
  MarkupTokenParser.prototype.inMarkupTag = false;
  MarkupTokenParser.prototype.tokenParser = null;
  
  MarkupTokenParser.prototype.processString = function (str) {
    return str.replace(/\\/g, "");
  };
  
  MarkupTokenParser.prototype.on_stringInterpolation = function (token, i) {
    this.processInterpolatedString(token.value);
  };
  
  MarkupTokenParser.prototype.on_interpolatedString = function (token, i) {
    debugger;
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
    debugger;
    if (keys && keys.length > 0) {
      this._translationKeys = this._translationKeys.concat(keys);
    }
  };
  
  
  
  module.exports = MarkupTokenParser;
})()