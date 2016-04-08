(function() {
  
  var XMLEntities = require('html-entities').XmlEntities;
  var HTMLEntities = require('html-entities').AllHtmlEntities;
  var utils = require('../lib/GenstringUtils');

  module.exports = {
    "attributes": {
      "translationKeys": {
        // HTMLTagWithContent<"tml-tr", (NonTag | NonTMLTag)+> --tmlTag
        "tmlLocalizedString_tmlTag": function(tag) {
          var keys = tag.translationKeys;
          debugger;
          return keys;
        },
        // HTMLTagWithAttribute<HTMLTagName, TRLAttributeExp> --trlInAttr
        "tmlLocalizedString_trlInAttr": function(tag) {
          var keys = tag.translationKeys;
          return keys;
        },
        // HTMLTagWithAttribute<HTMLTagName, TMLAttributeExp> --tmlInAttr
        "tmlLocalizedString_tmlInAttr": function(tag) {
          var keys = tag.translationKeys;
          return keys;
        },
        // HTMLTagWithAttributeAndContent<HTMLTagName, "tml-tr", (NonTag | NonTMLTag)+> --markedTag
        "tmlLocalizedString_markedTag": function(tag) {
          var keys = tag.translationKeys;
          return keys;
        },
        // | HTMLTagWithContent<HTMLTagName, TRLExp> --trlInTag
        "tmlLocalizedString_trlInTag": function(tag) {
          var keys = tag.translationKeys;
          return keys;
        },
        "tmlLocalizedTagContent": function(chars) {
          var key = utils.createTranslationKey(chars.interval.contents);
          if (key && key.label) {
            key.label = HTMLEntities.decode(key.label);
          }
          return [key];
        },
        // space* trlExp space*
        "tmlLocalizedTagContent_trl": function(_, trl, _) {
          return trl.translationKeys;
        },
        // "<" space* xmlTagName (space+ nonTMLAttribute)* space* ">" tmlLocalizedTagContent xmlCloseAnyTag
        "nonTMLTag": function(open, _, tag, _, attrs, _, close, content, closeTag) {
          return content.translationKeys;
        },
        // "tml-tr" "=" (QuotedTRLExp | StringLiteral)"
        "tmlAttributeExp": function(attr, _, arg) {
          return arg.translationKeys;
        },
        "quotedTRLExp": function(_, trl, _) {
          return trl.translationKeys;
        },
        "trlAttributeExp": function(attr, _, exp) {
          var keys = utils.collectTranslationKeysFromObjects(exp.translationKeys);
          if (keys instanceof Array && keys.length > 0) {
            keys.forEach(function(key) {
              key.label = XMLEntities.decode(key.label);
            });
          }
          return keys;
        },
        // "{{" space* (trlMethod | trlFilter) space* "}}"
        "trlExp": function(open, _, trl, _, close) {
          return trl.translationKeys;
        },
        // "trl" "(" space* stringLiteral space* ")"
        "trlMethod": function(macro, open, _, str, _, close) {
          return str.translationKeys;
        },
        // stringLiteral space* "|" space* "trl" (space* ":" space* argExp)? (space* "|" space* filterName)*
        "trlFilter": function(str, _, pipe, _, macro, _, argSep, _, arg, _, pipe, _, filters) {
          return str.translationKeys;
        },
        "filterName": function(str) {
          return null;
        },
        // "{" space* listOf<dictEntry, argSep> space* "}"
        "dict": function(open, _, entries, _, close) {
          return entries.translationKeys;
        },
        // (stringLiteral | variable) space* ":" space* argExp
        "dictEntry": function(key, _, sep, _, val) {
          return val.translationKeys;
        },
        // "[" space* listOf<argExp, argSep> space* "]"
        "array": function(open, _, items, _, close) {
          return items.translationKeys;
        }
      }
    }
  }

})();