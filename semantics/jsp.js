(function() {
  
  var XMLEntities = require('html-entities').XmlEntities;
  var HTMLEntities = require('html-entities').AllHtmlEntities;
  var utils = require('../lib/GenstringUtils');

  module.exports = {
    "attributes": {
      "translationKeys": {
        // XMLTagWithAttribute<TMLTagName, TMLTagLabelAttribute> 
        "TMLLocalizedString_tmlInAttribute": function(tag) {
          debugger;
          return tag.translationKeys;
        },
        // XMLTagWithContent<TMLTagName, TMLLocalizedTagContent>
        "TMLLocalizedString_tmlInTag": function(tag) {
          debugger;
          return tag.translationKeys;
        },
        "TMLAttributeExp": function(attr, _, val) {
          debugger;
          var key = val.translationKeys;
          if (key && key.label) {
            key.label = XMLEntities.decode(key.label);
          }
          return key;
        },
        "TMLLocalizedTagContent": function(chars) {
          debugger;
          var str = XMLEntities.decode(chars.interval.contents);
          var key = utils.createTranslationKey(str);
          return key;
        }
      }
    }
  }

})();