(function() {
  
  var utils = require('../lib/utils');

  module.exports = {
    "attributes": {
      "tokens": {
        "string": function (strings, _) {
          var tokens = strings.tokens;
          var str = "";
          for (var i=0; i<tokens.length; i++) {
            str += tokens[i].value;
          }
          return utils.createResult(this, str);
        },
        
      }
    }
  }

})();