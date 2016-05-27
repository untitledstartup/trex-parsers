(function(){
  
  var utils = require('../lib/utils.js');
  
  module.exports = {
    "attributes": {
      "tokens": {
        
        "xmlOpenTag": function (n) {
          return utils.createResult(this, n);
        },
        "xmlCloseTag": function (n) {
          return utils.createResult(this, n);
        },
        "xmlTagText": function (close, text) {
          var a = close.tokens;
          var b = utils.createResult("string", text);
          return [a, b];
        },
        "xmlTagTRLText": function (close, _, exp, _) {
          return [close.tokens, exp.tokens];
        },
        "xmlTagContent": function (content) {
          return content.tokens;
        }
      
      }
    }
  }

})();