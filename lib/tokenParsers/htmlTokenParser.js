(function(){
  var inherits = require('inherits');
  var Path = require('path');
  var XMLTokenParser = require(Path.join(__dirname, 'xmlTokenParser'));
  var Entities = require('html-entities').AllHtmlEntities;
  
  function HTMLTokenParser() {
  }
  
  inherits(HTMLTokenParser, XMLTokenParser);
  
  HTMLTokenParser.prototype.decodeString = function (str) {
    return Entities.decode(str);
  };
  
  
  module.exports = HTMLTokenParser;
})()