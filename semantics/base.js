(function(){
  
  var utils = require('../lib/utils.js');
  
  module.exports = {
    "attributes": {
      "tokens": {
        
        "macro": function (n) {
          return utils.createResult(this, n);
        },
        
        "nil": function (n) {
          return utils.createResult(this, n);
        },
        "bool": function (n) {
          return utils.createResult(this, n);
        },
        
        "number": function (n) {
          return utils.createResult(this, n);
        },
        "hexNumber": function (_minus, prefix, digits) {
          return null;
        },
        "octalNumber": function (_minus, prefix, digits) {
          return null;
        },
        "expNumber": function (decimal, suffix, _minus, expDigits) {
          return null;
        },
        "decimal": function (nodes) {
          return null;
        },
        "decimal_float": function (a, _, b) {
          return null;
        },
        
        
        "string": function (node) {
          var result = node.tokens;
          result = utils.createResult(this, result.value);
          return result;
        },
        "quotedString": function (quot, chars, quot) {
          // debugger;
          return utils.createResult(this, chars);
        },
        
        "operator": function (op) {
          return utils.createResult(this, op);
        },
        "openExpressionOperator": function (op) {
          return utils.createResult(this, op);
        },
        "closeExpressionOperator": function (op) {
          return utils.createResult(this, op);
        },
        
        "namedToken": function (chars) {
          var result = utils.createResult(this, chars);
          return result;
        }
      
      }
    }
  }

})();