(function() {
  
  var XMLEntities = require('html-entities').XmlEntities;
  var HTMLEntities = require('html-entities').AllHtmlEntities;
  var utils = require('../lib/utils');

  module.exports = {
    "attributes": {
      "tokens": {
        "openTag": function (n) {
          return utils.createResult(this, n);
        },
        "closeTag": function (n) {
          return utils.createResult(this, n);
        },
        "tagText": function (close, text) {
          var a = close.tokens;
          var b = utils.createResult(this, text);
          return [a, b];
        }
        
      }
    }
  }

})();