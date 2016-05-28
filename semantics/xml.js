(function(){
  
  var utils = require('../lib/utils.js');
  
  module.exports = {
    "attributes": {
      "tokens": {
        
        "xmlOpenTag": function (n, _) {
          return utils.createResult(this, n.interval.contents + _.interval.contents);
        },
        "xmlCloseTag": function (_, n) {
          return utils.createResult(this, _.interval.contents + n.interval.contents);
        },
        "xmlTagText_default": function (close, text) {
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