(function(){
  var inherits = require('inherits');
  var Path = require('path');
  var XMLTokenParser = require(Path.join(__dirname, 'xmlTokenParser'));
  
  function JSPTokenParser() {
  }
  
  inherits(JSPTokenParser, XMLTokenParser);
  
  JSPTokenParser.prototype.onMacro = function (token, i) {
    // we should really encounter macros inside tags
    if (!this.inTag) {
      return;
    }
    debugger;
    
    var m = this.createMatch(token.value);
    while ((token = i.next())) {
      if (token.type == "namedToken" && (token.value == "label" || token.value == "description")) {
        var attr = token.value;
        token = i.next();
        if (token.type == "operator" && token.value == "=") {
          token = i.next();
          if (token.type == "string") {
            m[attr] = this.processString(token.value);
          }
        }
      }
      else if (token.type == "xmlCloseTag") {
        this.inTag = false;
        if (!m.label && (token = i.peek()) && token.type == "string") {
          token = i.next();
          m.label = this.processString(token.value);
        }
        break;
      }
    }
    
    if (m.label) {
      this.pushTranslationKey(m.toTranslationKey());
    }
  };
  
  module.exports = JSPTokenParser;
})()