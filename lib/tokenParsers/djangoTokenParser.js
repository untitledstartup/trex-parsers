(function(){
  var inherits = require('inherits');
  var Path = require('path');
  var XMLTokenParser = require(Path.join(__dirname, 'xmlTokenParser'));
  
  function DjangoTokenParser() {
  }
  
  inherits(DjangoTokenParser, XMLTokenParser);
  
  DjangoTokenParser.prototype.processString = function (str) {
    return str.replace(/\\/g, "");
  };
  
  DjangoTokenParser.prototype.on_macro = function (token, i) {
    // we should really encounter macros inside tags
    if (!this.inTag) {
      return;
    }

    var macro = token.value;
    var m = this.createMatch(macro);
    
    if (macro == "trs") {
      token = i.next();
      if (token.type == "string") {
        m.label = this.processString(token.value);
      }
      else if (token.type == "interpolatedString") {
        this.informInterpolatedString(token);
      }
      else {
        this.informStringConstruction(token);
      }
      token = i.next();
      if (token.type == "string") {
        m.description = this.processString(token.value);
      }
      else if (token.type == "interpolatedString") {
        this.informInterpolatedString(token);
      }
      
      if (token.type != "xmlCloseTag") {
        this.skipToToken(i, {type: "xmlCloseTag"});
      }
    }
    else {
      this.skipToToken(i, {type: "xmlCloseTag"});
      token = i.next();
      if (token.type == "string") {
        m.label = token.value.trim();
      }
      else if (token.type == "interpolatedString") {
        this.informInterpolatedString(token);
      }
    }
    
    if (m.label) {
      this.pushTranslationKey(m.toTranslationKey());
    }
    
  };
  
  module.exports = DjangoTokenParser;
})()