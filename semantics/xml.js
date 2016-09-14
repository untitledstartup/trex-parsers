(function(){
  
  var utils = require('../lib/utils.js');
  
  module.exports = {
    "attributes": {
      "tokens": {
        
        "descriptionAttribute": function(n) {
          return utils.createResult(this, n.interval.contents);
        },
        
        "xmlOpenTag": function (n) {
          if (n._node.ctorName == "xmlOpenClosingTag") {
            return n.tokens;
          }
          return utils.createResult(this, n.interval.contents);
        },
        "xmlOpenClosingTag": function (n, _space, _slash) {
          return utils.createResult(this, n.interval.contents + _space.interval.contents + _slash.interval.contents);
        },
        "xmlCloseTag": function (n) {
          return utils.createResult(this, n.interval.contents);
        },
        "xmlCloseTag_closing": function (_slash, _space, n) {
          return utils.createResult(this, _slash.interval.contents + _space.interval.contents + n.interval.contents);
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