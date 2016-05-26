(function(){
  
  var Path = require('path');
  var inherits = require('inherits');
  var TokenParser = require(Path.join(__dirname, "tokenParser"));
  var GSUtils = require(Path.join(Path.dirname(__dirname), "utils"));
  
  function ObjcTokenParser() {
  }
  
  inherits(ObjcTokenParser, TokenParser);
  
  ObjcTokenParser.prototype.onUnexpectedToken = function onUnexpectedToken(token) {
    if (token.node.ctorName == "cstring") {
      this.warn("CString while expecting NSString", GSUtils.debugDescriptionForNode(token.node));
    }
    else {
      this.super_.onUnexpectedToken(token);
    }
  };
  
  module.exports = ObjcTokenParser;
  
})()