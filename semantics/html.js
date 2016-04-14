(function() {
  
  var XMLEntities = require('html-entities').XmlEntities;
  var HTMLEntities = require('html-entities').AllHtmlEntities;
  var utils = require('../lib/GenstringUtils');

  module.exports = {
    "attributes": {
      "translationKeys": {
        // HTMLTagWithContent<"tml-tr", (NonTag | NonTMLTag)+> --tmlTag
        "tmlLocalizedString_tmlTag": function(tag) {
          var result = tag.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlLocalizedString_tmlTag", result);
          return result;
        },
        // HTMLTagWithAttribute<HTMLTagName, TRLAttributeExp> --trlInAttr
        "tmlLocalizedString_trlInAttr": function(tag) {
          var result = tag.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlLocalizedString_trlInAttr", result);
          return result;
        },
        // HTMLTagWithAttribute<HTMLTagName, TMLAttributeExp> --tmlInAttr
        "tmlLocalizedString_tmlInAttr": function(tag) {
          var result = tag.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlLocalizedString_tmlInAttr", result);
          return result;
        },
        // HTMLTagWithAttributeAndContent<HTMLTagName, "tml-tr", (NonTag | NonTMLTag)+> --markedTag
        "tmlLocalizedString_markedTag": function(tag) {
          var result = tag.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlLocalizedString_markedTag", result);
          return result;
        },
        // | HTMLTagWithContent<HTMLTagName, TRLExp> --trlInTag
        "tmlLocalizedString_trlInTag": function(tag) {
          var result = tag.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlLocalizedString_trlInTag", result);
          return result;
        },
        "tmlLocalizedTagContent": function(chars) {
          var str = chars.interval.contents;
          if (!str || str.trim().length === 0) {
            return null;
          }
          var key = utils.createTranslationKey(str);
          if (!key) {
            return null;
          }
          if (key && key.label) {
            key.label = HTMLEntities.decode(key.label);
          }
          var result = utils.createResult("tmlLocalizedTagContent", key);
          return result;
        },
        // space* trlExp space*
        "tmlLocalizedTagContent_trl": function(_, trl, _) {
          var result = trl.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlLocalizedTagContent_trl", result);
          return result;
        },
        // "<" space* xmlTagName (space+ nonTMLAttribute)* space* ">" tmlLocalizedTagContent xmlCloseAnyTag
        "nonTMLTag": function(open, _, tag, _, attrs, _, close, content, closeTag) {
          var result = content.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("nonTMLTag", null, result);
          return result;
        },
        // "tml-tr" "=" (QuotedTRLExp | StringLiteral)"
        "tmlAttributeExp": function(attr, _, arg) {
          var result = arg.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlAttributeExp", result);
          return result;
        },
        "quotedTRLExp": function(_, trl, _) {
          var result = trl.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("quotedTRLExp", result);
          return result;
        },
        "trlAttributeExp": function(attr, _, exp) {
          var result = exp.translationKeys;
          if (!result) {
            return null;
          }
          var keys = utils.collectTranslationKeysFromObjects(result);
          if (!keys || keys.length === 0) {
            return null;
          }
          keys.forEach(function(key) {
            key.label = XMLEntities.decode(key.label);
          });
          result = utils.createResult("trlAttributeExp", keys);
          return result;
        },
        // "{{" space* (trlMethod | trlFilter) space* "}}"
        "trlExp": function(open, _, trl, _, close) {
          var result = trl.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("trlExp", result);
          return result;
        },
        // "trl" "(" space* stringLiteral space* ")"
        "trlMethod": function(macro, open, _, str, _, close) {
          var result = str.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("trlMethod", result);
          return result;
        },
        // stringLiteral space* "|" space* "trl" (space* ":" space* argExp)? (space* "|" space* filterName)*
        "trlFilter": function(str, _, pipe, _, macro, _, argSep, _, arg, _, pipe, _, filters) {
          var result = str.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("trlFilter", result);
          return result;
        },
        "filterName": function(str) {
          return null;
        },
        // "{" space* listOf<dictEntry, argSep> space* "}"
        "dict": function(open, _, entries, _, close) {
          var result = entries.translationKeys;
          if (!result) {
            return null;
          }
          result.flatten();
          result.results = null;
          result = utils.createResult("dict", result);
          return result;
        },
        // (stringLiteral | variable) space* ":" space* argExp
        "dictEntry": function(key, _, sep, _, val) {
          var result = val.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("dictEntry", result);
          return result;
        },
        // "[" space* listOf<argExp, argSep> space* "]"
        "array": function(open, _, items, _, close) {
          var result = items.translationKeys;
          if (!result) {
            return null;
          }
          result.flatten();
          result.results = null;
          result = utils.createResult("array", result);
          return result;
        }
      }
    }
  }

})();