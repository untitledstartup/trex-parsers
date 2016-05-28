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
        }
      }
    }
  }

})();