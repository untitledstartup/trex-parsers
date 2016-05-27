(function(){
  
  var utils = require('../lib/utils.js');
  
  module.exports = {
    "attributes": {
      "tokens": {
        "string": function (strs, _) {
          var tokens = strs.tokens;
          var result = null;
          if (tokens.length > 0 && tokens[0].type == "boxedString") {
            var str = "";
            for (var i=0; i<tokens.length; i++) {
              var result = tokens[i];
              if (result.type == "boxedString") {
                str += result.value;
              }
              else if (result.type == "cstring" && str.length > 0) {
                str += result.value;
              }
            }
            result = utils.createResult(this, str);
          }
          else {
            result = tokens;
          }
          return result;
        },
        "cstring": function (str) {
          var result = str.tokens;
          result = utils.createResult(this, result.value);
          return result;
        },
        "boxedString": function(_, str) {
          var result = str.tokens;
          result = utils.createResult(this, result.value);
          return result;
        },
        "boxedNumber": function (_, n) {
          var result = n.tokens;
          result = utils.createResult(this, result.value);
          return result;
        },
        "boxedNamedToken": function (_, n) {
          var result = n.tokens;
          result = utils.createResult(this, result.value);
          return result;
        },
        
        
      }
    }
  }
})()