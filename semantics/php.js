(function(){
  
  var utils = require('../lib/utils');
  
  module.exports = {
    "attributes": {
      "tokens": {
        "dynamicMacro": function (n) {
          return utils.createResult(this, n);
        },
        "heredoc": function (start, str, end) {
          return utils.createResult(this, str);
        },
        "string_heredoc": function (n) {
          var result = n.tokens;
          result.type = "string";
          return result;
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
        
      }
    }
  }

})();