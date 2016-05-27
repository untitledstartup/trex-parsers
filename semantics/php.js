(function(){
  
  var utils = require('../lib/utils');
  
  module.exports = {
    "attributes": {
      "tokens": {
        "dynamicMacro": function (n) {
          return utils.createResult(this, n);
        },
      }
    }
  }

})();