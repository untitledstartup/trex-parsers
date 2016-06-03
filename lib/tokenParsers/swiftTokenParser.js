(function(){
  
  var Path = require('path');
  var inherits = require('inherits');
  var TokenParser = require(Path.join(__dirname, "tokenParser"));
  var GSUtils = require(Path.join(Path.dirname(__dirname), "utils"));
  
  function SwiftTokenParser() {
  }
  
  inherits(SwiftTokenParser, TokenParser);
  
  SwiftTokenParser.prototype.onMacroArgument = function on_macroArgument(token, i) {
    debugger;
    if (token.type == "namedToken") {
      token = i.next();
      if (token.type == "operator" && token.value == ":") {
        token = i.next();
      }
      else {
        this.onStringConstruction(token);
        return;
      }
    }
    this.constructor.super_.prototype.onMacroArgument.apply(this, [token, i]);
  };
  
  SwiftTokenParser.prototype.on_macro = function on_macro(token, i) {
    var macro = token.value;

    // make sure macro is followed by openExpressionOperator
    token = i.next();
    if (!token || token.type != "openExpressionOperator") {
      return;
    }
    
    debugger;
    
    token = i.next();
    if (token.type == "namedToken") {
      token = i.next();
      if (!(token.type == "operator" && token.value == ":")) {
        this.onStringConstruction(token);
        return;
      }
      token = i.next();
    }
    
    if (token.type != "string" && token.type != "interpolatedString") {
      this.onUnexpectedToken(token);
      return;
    }
    
    var newMatch = this.createMatch(macro);
    this.pushMatch(newMatch);
    
    this.onMacroArgument(token, i);
  };
  
  module.exports = SwiftTokenParser;
  
})()