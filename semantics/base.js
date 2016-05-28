(function(){
  
  var utils = require('../lib/utils.js');
  
  module.exports = {
    "attributes": {
      "tokens": {
        
        "macro": function (n) {
          return utils.createResult(this, n);
        },
        "dynamicMacro": function (n, _) {
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
        
        
        "stringInterpolation_default": function (_, _, _, _, _) {
          return null;
        },
        "stringInterpolationToken": function (n) {
          return null;
        },
        "stringInterpolationToken_exp": function (_, n, _) {
          return null;
        },
        "interpolatedString": function (openQuote, prefixes, interpolation, suffix, closeQuote) {
          var str = this.interval.contents;
          return utils.createResult(this, str);
        },
        "string_concat": function (str, _, _, _, additional) {
          var all = [];
          var tokens = str.tokens;
          if (tokens) {
            all.push(tokens);
          }
          var additionalTokens = additional.tokens;
          if (additionalTokens && additionalTokens.length > 0) {
            all = all.concat(additionalTokens);
          }
          var str = "";
          for (var i=0; i<all.length; i++) {
            str += all[i].value;
          }
          return utils.createResult(this, str);
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
        },
        
        
        // TRL
        "quotedTRLExp": function (quot, exp, quot) {
          return exp.tokens;
        },
        "trlExp": function (_, _, exp, _, _) {
          var result = exp.tokens;
          if (result) {
            result = utils.createResult("trlString", result.value);
          }
          return result;
        },
        "trlMethod": function (_, _, _, str, _, _) {
          return str.tokens;
          // var result = str.tokens;
          // result = utils.createResult(this, result.value);
          // return result;
        },
        "trlFilter": function (str, _, _, _, _) {
          return str.tokens;
          // var result = str.tokens;
          // result = utils.createResult(this, result.value);
          // return result;
        },
        "trlString": function (str) {
          return str.tokens;
        }
      
      }
    }
  }

})();