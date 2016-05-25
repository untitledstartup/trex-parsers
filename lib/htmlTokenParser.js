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
    while (!i.done()) {
      var token = i.next();
      debugger;
      
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
        token = i.next();
        if (token.type == "operator") {
          token = i.next();
          if (token.type == "string") {
            var m = this.createMatch(macro, token.value);
            this.pushTranslationKey(m.toTranslationKey());
          }
        }
        else {
          do {
            if (token.type == "closeTag") {
              inTag = false;
              break;
            }
          } while ((token = i.next()))
          token = i.next();
          if (token.type == "tagText") {
            var m = this.createMatch(macro, token.value.trim());
            this.pushTranslationKey(m.toTranslationKey());
          }
        }
      }
      else if (inTag && token.type == "trlExp") {
        var m = this.createMatch(this.macro, token.value);
        this.pushTranslationKey(m.toTranslationKey());
      }
    }
  };
  
  module.exports = XMLTokenParser;
})()