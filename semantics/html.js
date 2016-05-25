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
        "tagText_normal": function (close, text) {
          var a = close.tokens;
          var b = utils.createResult("tagText", text);
          return [a, b];
        },
        "tagText_trl": function (_, _, exp, _) {
          return exp.tokens;
        },
        
        
        
        "quotedTRLExp": function (quot, exp, quot) {
          var result = exp.tokens;
          return result;
        },
        "trlExp": function (_, _, exp, _, _) {
          var result = exp.tokens;
          if (result) {
            result = utils.createResult(this, result.value);
          }
          return result;
        },
        "trlMethod": function (_, _, _, str, _, _) {
          var result = str.tokens;
          result = utils.createResult(this, result.value);
          return result;
        },
        "trlFilter": function (str, _, _, _, _) {
          var result = str.tokens;
          result = utils.createResult(this, result.value);
          return result;
        },
        
        
      }
    }
  }

})();