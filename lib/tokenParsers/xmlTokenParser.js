(function(){
  var inherits = require('inherits');
  var Path = require('path');
  var Entities = require('html-entities').XmlEntities;
  var TokenParser = require(Path.join(__dirname, 'tokenParser'));
  
  function XMLTokenParser() {
  }
  
  inherits(XMLTokenParser, TokenParser);
  
  XMLTokenParser.prototype.inTag = false;
  
  XMLTokenParser.prototype.decodeString = function (str) {
    return Entities.decode(str);
  };
  XMLTokenParser.prototype.processString = function (str) {
    return this.decodeString(str.trim());
  };
  
  XMLTokenParser.prototype.on_xmlOpenTag = function (token, i) {
    this.inTag = true;
  };
  XMLTokenParser.prototype.on_xmlCloseTag = function (token, i) {
    this.inTag = false;
  };
  XMLTokenParser.prototype.on_trlString = function (token, i) {
    var str = this.processString(token.value);
    var m = this.createMatch(token.type, str);
    this.pushTranslationKey(m.toTranslationKey());
  };
  
  XMLTokenParser.prototype.on_macro = function (token, i) {
    // we should really encounter macros inside tags
    if (!this.inTag) {
      return;
    }
    
    var m = this.createMatch(token.value);
    token = i.next();
    
    // macro is an attribute with value
    // localized string is inside the value
    if (token.type == "operator" && token.value == "=") {
      token = i.next();
      if (token.type == "string") {
        m.label = this.processString(token.value);
      }
      else if (token.type == "interpolatedString") {
        this.onInterpolatedString(token);
      }
    }
    // macro is either a tag or an attribute w/o value
    // localized string is tag's text content
    else {
      do {
        if (token.type == "xmlCloseTag") {
          this.inTag = false;
          break;
        }
      } while ((token = i.next()))
      
      token = i.next();
      if (token && (token.type == "string" || token.type == "trlString")) {
        m.label = this.processString(token.value);
      }
      else if (token && token.type == "interpolatedString") {
        this.onInterpolatedString(token);
      }
    }
    if (m.label) {
      this.pushTranslationKey(m.toTranslationKey());
    }
  };
  
  module.exports = XMLTokenParser;
})()