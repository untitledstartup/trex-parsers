(function() {
  
  var XMLEntities = require('html-entities').XmlEntities;
  var HTMLEntities = require('html-entities').AllHtmlEntities;
  var utils = require('../lib/GenstringUtils');

  module.exports = {
    "attributes": {
      "translationKeys": {
        // xmlTagWithAttribute<tmlTagName, tmlTagLabelAttribute> 
        "tmlLocalizedString_tmlInAttribute": function(tag) {
          var result = tag.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlLocalizedString_tmlInAttribute", result);
          return result;
        },
        // xmlTagWithContent<tmlTagName, tmlLocalizedTagContent>
        "tmlLocalizedString_tmlInTag": function(tag) {
          var result = tag.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlLocalizedString_tmlInTag", result);
          return result;
        },
        "tmlAttributeExp": function(attr, _, val) {
          var result = val.translationKeys;
          if (!result) {
            return null;
          }
          var keys = utils.collectTranslationKeysFromObjects(result);
          if (!keys) {
            return null;
          }
          if (keys instanceof Array && keys.length > 0) {
            keys.forEach(function(key) {              
              key.label = XMLEntities.decode(key.label);
            });
          }
          result = utils.createResult("tmlAttributeExp", result);
          return result;
        },
        "tmlLocalizedTagContent": function(chars) {
          var str = chars.interval.contents;
          if (!str || str.trim().length === 0) {
            return null;
          }
          var str = XMLEntities.decode(str);
          var key = utils.createTranslationKey(str);
          var result = utils.createResult("tmlLocalizedTagContent", key);
          return result;
        }
      }
    }
  }

})();