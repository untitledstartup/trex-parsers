(function() {
  
  var XMLEntities = require('html-entities').XmlEntities;
  var HTMLEntities = require('html-entities').AllHtmlEntities;
  var utils = require('../lib/GenstringUtils');

  module.exports = {
    "attributes": {
      "translationKeys": {
        // HTMLTagWithContent<"tml-tr", (NonTag | NonTMLTag)+> --tmlTag
        "TMLLocalizedString_tmlTag": function(tag) {
          var key = tag.translationKeys;
          return key;
        },
        // HTMLTagWithAttribute<HTMLTagName, TRLAttributeExp> --trlInAttr
        "TMLLocalizedString_trlInAttr": function(tag) {
          var key = tag.translationKeys;
          return key;
        },
        // HTMLTagWithAttribute<HTMLTagName, TMLAttributeExp> --tmlInAttr
        "TMLLocalizedString_tmlInAttr": function(tag) {
          var key = tag.translationKeys;
          return key;
        },
        // HTMLTagWithAttributeAndContent<HTMLTagName, "tml-tr", (NonTag | NonTMLTag)+> --markedTag
        "TMLLocalizedString_markedTag": function(tag) {
          var key = tag.translationKeys;
          return key;
        },
        // | HTMLTagWithContent<HTMLTagName, TRLExp> --trlInTag
        "TMLLocalizedString_trlInTag": function(tag) {
          var key = tag.translationKeys;
          return key;
        },
        "TMLLocalizedTagContent": function(chars) {
          var key = utils.createTranslationKey(chars.interval.contents);
          if (key && key.label) {
            key.label = HTMLEntities.decode(key.label);
          }
          return key;
        },
        "TMLLocalizedTagContent_trl": function(trl) {
          return trl.translationKeys;
        },
        // "<" HTMLTagName NonTMLAttribute* ">" TMLLocalizedTagContent HTMLCloseAnyTag
        "NonTMLTag": function(_, tag, attrs, _, content, _) {
          return content.translationKeys;
        },
        // "tml-tr" "=" (QuotedTRLExp | StringLiteral)"
        "TMLAttributeExp": function(attr, _, arg) {
          return arg.translationKeys;
        },
        "QuotedTRLExp": function(_, trl, _) {
          return trl.translationKeys;
        },
        "TRLAttributeExp": function(attr, _, exp) {
          var result = exp.translationKeys;
          if (result && result.label) {
            result.label = XMLEntities.decode(result.label);
          }
          return result;
        },
        "TRLExp": function(_, trl, _) {
          return trl.translationKeys;
        },
        // "trl" "(" StringLiteral ")"
        "TRLMethod": function(macro, _, str, _) {
          return str.translationKeys;
        },
        //StringLiteral "|" "trl" ":" (Variable | Object) ( "|" FilterName)*
        "TRLFilter": function(str, pipe, macro, argSep, arg, pipe, filters) {
          return str.translationKeys;
        },
        "FilterName": function(str) {
          return "";
        },
        "Dict": function(_, entries, _) {
          return entries.translationKeys;
        },
        "DictEntry": function(key, _, val) {
          return val.translationKeys;
        },
        "Array": function(_, items, _) {
          return items.translationKeys;
        }
      }
    }
  }

})();