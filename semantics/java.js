(function(){
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        // Macro "(" StringLiteral ("," ArgExp)* ")" ";"*
        "TMLLocalizedString": function(macro, open, str, sep, args, close, semicolon) {
          var label = null;
          var labelKey = str.translationKeys;
          if (labelKey && labelKey.label) {
            label = labelKey.label;
          }
          
          if (label == null) {
            return null;
          }
          
          var argResult = args.translationKeys;
          var description = null;
          if (argResult && argResult.length > 0) {
            var arg = argResult[0];
            if (arg instanceof Array) {
              arg = arg[0];
            }
            if (arg && arg.label) {
              description = arg.label;
            }
          }
          var key = utils.createTranslationKey(label, description);
          return key;
        },
        // QuotedStringLiteral<"\"", stringNonLiteral> ("+" StringLiteral)*
        "StringLiteral": function(str, _, additional) {
          var key = str.translationKeys;
          var label = (key && key.label) ? key.label : "";
          if (additional && additional.interval.contents.length > 0) {
            var children = additional.children;
            for (var i=0; i<children.length; i++) {
              var str = children[i].interval.contents;
              str = str.substring(1, str.length - 1);
              label += str;
            }
          }
          return utils.createTranslationKey(label);
        },
        // #(validFirstVarChar validVarChar*) Generics?
        "Variable": function(first, rest, generics) {
          return "";
        },
        // "<" ListOf<(Property | Variable), ","> ">"
        "Generics": function(_, props, _) {
          return "";
        },
        // "new" space+ MethodName Generics? "(" ListOf<ArgExp, ","> ")"
        "NewObject":function(_, _, methodName, generics, open, args, close) {
          return args.translationKeys;
        },
        // ArgExp "[" ArgExp "]"
        "CollectionAccess": function(variable, open, indexExp, close) {
          return indexExp.translationKeys;
        }
      }
    }
  }
})()