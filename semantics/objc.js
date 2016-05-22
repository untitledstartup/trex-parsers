(function(){
  
  var utils = require('../lib/utils.js');
  
  module.exports = {
    "attributes": {
      "tokens": {
        "string": function (str) {
          var result = str.tokens;
          if (result.type == "boxedString") {
            result = utils.createResult(this, result.value);
          }
          return result;
        },
        "cstring": function (str) {
          var result = str.tokens;
          result = utils.createResult(this, result.value);
          return result;
        },
        "boxedString": function(_, quotedStr) {
          var result = quotedStr.tokens;
          result = utils.createResult(this, result.value);
          return result;
        },
        "number_boxed": function (_, num) {
          var result = num.tokens;
          debugger;
          result = utils.createResult(this, result.value);
          return result;
        }
        
      }
    }
  }
})()