(function(){
  
  var utils = require('../lib/utils.js');
  
  module.exports = {
    "attributes": {
      "tokens": {
        
        "xmlTagContent": function (n) {
          return n.tokens;
        },
        
        "xmlTagText_interp": function (close, interpString) {
          var a = close.tokens;
          var b = utils.createResult("stringInterpolation", interpString);
          return [a, b];
        },
      
      }
    }
  }

})();