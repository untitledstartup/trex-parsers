(function(){
  var inherits = require('inherits');
  var Path = require('path');
  var TokenParser = require(Path.join(__dirname, 'tokenParser'));
  
  function XMLTokenParser() {
  }
  
  inherits(XMLTokenParser, TokenParser);
  
  XMLTokenParser.prototype.processTokens = function processTokens(tokens) {
    var grammar = this.grammar;
    var i = tokens.iterator;
    var inTag = false;
    debugger;
    while (!i.done()) {
      var token = i.next();
      
      if (token.type == "openTag") {
        inTag = true;
        consumeTagContents = false;
        continue;
      }
      else if (token.type == "closeTag") {
        inTag = false;
        continue;
      }
      else if (token.type == "macro") {
        var macro = token.value;
        if (!inTag) {
          continue;
        }
        token = i.peek();
        if (token.type == "operator") {
          token = i.next();
          token = i.next();
          if (token.type == "string") {
            var m = this.createMatch(macro, token.value);
            this.pushTranslationKey(m.toTranslationKey());
          }
        }
        else {
          while ((token = i.next())) {
            if (token.type == "closeTag") {
              inTag = false;
              break;
            }
          }
          token = i.next();
          if (token.type == "tagText") {
            var m = this.createMatch(macro, token.value.trim());
            this.pushTranslationKey(m.toTranslationKey());
          }
        }
      }
    }
  };
  
  module.exports = XMLTokenParser;
})()