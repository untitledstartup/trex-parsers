(function() {
  
var XMLEntities = require('html-entities').XmlEntities;
var HTMLEntities = require('html-entities').AllHtmlEntities;

module.exports = {
  "attributes": {
    "translationKeys": {
      // := HTMLTag<"tml-tr"> (~HTMLCloseTag<"tml-tr"> any)+ HTMLCloseTag<"tml-tr"> --tag
      "TMLLocalizedString_tag": function(open, chars, close) {
        var label = chars.interval.contents;
        if (label) {
          label = HTMLEntities.decode(label);
        }
        return {"label": label};
      },
      // | "<" HTMLTagName (~"tml-tr" HTMLTagAttributeExp)* "tml-tr" "=" StringLiteral HTMLTagAttributeExp* "/"? ">" --tagAttr
      "TMLLocalizedString_tagAttr": function(open, tag, preAttrs, tmlAttr, _, str, postAttrs, _, close) {
        var label = str.translationKeys;
        if (label) {
          label = XMLEntities.decode(label);
        }
        return {"label": label};
      },
      // | "<" HTMLTagName (~"tml-tr" HTMLTagAttributeExp)* "tml-tr" HTMLTagAttributeExp* ">" (~"<" any)+ HTMLCloseAnyTag --markedTag
      "TMLLocalizedString_markedTag": function(open, tag, preAttrs, tmlAttr, postAttrs, close, chars, closeTag) {
        var label = chars.interval.contents;
        if (label) {
          label = HTMLEntities.decode(label);
        }
        return {"label": label};
      },
      // | "<" HTMLTagName (~(HTMLTagAttributeName "=" QuotedTRLExp) any)* HTMLTagAttributeName "=" QuotedTRLExp HTMLTagAttributeExp* "/"? ">" --trlInAttr
      "TMLLocalizedString_trlInAttr": function(open, tag, preAttrNames, attr, _, trl, postAttrs, _, close) {
        var label = trl.translationKeys;
        if (label) {
          label = XMLEntities.decode(label);
        }
        return {"label": label};
      },
      // | HTMLAnyTag TRLExp HTMLCloseAnyTag --trlInTag
      "TMLLocalizedString_trlInTag": function(open, trl, close) {
        var label = trl.translationKeys;
        if (label) {
          label = HTMLEntities.decode(label);
        }
        return {"label": label};
      },
      "QuotedTRLExp": function(_, trl, _) {
        return trl.translationKeys;
      },
      "TRLExp": function(_, trl, _) {
        return trl.translationKeys;
      },
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