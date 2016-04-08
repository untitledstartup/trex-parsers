(function() {
  
  var XMLEntities = require('html-entities').XmlEntities;
  var HTMLEntities = require('html-entities').AllHtmlEntities;
  var utils = require('../lib/GenstringUtils');

  module.exports = {
    "attributes": {
      "translationKeys": {
        // xmlTagWithAttribute<tmlTagName, tmlTagLabelAttribute> 
        "tmlLocalizedString_tmlInAttribute": function(tag) {
          return tag.translationKeys;
        },
        // xmlTagWithContent<tmlTagName, tmlLocalizedTagContent>
        "tmlLocalizedString_tmlInTag": function(tag) {
          return tag.translationKeys;
        },
        "tmlAttributeExp": function(attr, _, val) {
          var keys = utils.collectTranslationKeysFromObjects(val.translationKeys);
          if (keys instanceof Array && keys.length > 0) {
            keys.forEach(function(key) {              
              key.label = XMLEntities.decode(key.label);
            });
          }
          return keys;
        },
        "tmlLocalizedTagContent": function(chars) {
          var str = XMLEntities.decode(chars.interval.contents);
          var key = utils.createTranslationKey(str);
          return [key];
        }
      }
    }
  }

})();