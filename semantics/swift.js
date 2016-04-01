(function(){
  var utils = require('../lib/GenstringUtils');
  module.exports = {
    "attributes": {
      "translationKeys": {
        // Macro "(" StringLiteral ("," ArgExp)* ")"
        "TMLLocalizedString": function(macro, open, str, sep, args, close) {
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
        "StringLiteral": function(strings) {
          var result = strings.translationKeys;
          debugger;
          if (result instanceof Array) {
            var str = null;
            for (var i=0; i<result.length; i++) {
              var r = result[i];
              if (i===0) {
                str = r.label;
              }
              else {
                str += "\n" + r.label;
              }
            }
            result = utils.createTranslationKey(str);
          }
          return result;
        },
        "Macro": function(e) {
          return "";
        },
        "NamedArg": function(varName, sep, arg) {
          return arg.translationKeys;
        },
        "Dict": function(open, parts, close) {
          return "";
        },
        "DictEntry": function(key, _, val) {
          return "";
        },
        "DictValue": function(e) {
          return e.translationKeys;
        },
        "Array": function(open, parts, close) {
          return "";
        },
        "ArrayEntry": function(e) {
          return e.translationKeys;
        },
        "CollectionAccess": function(varname, open, arg, close) {
          return "";
        }
      }
    }
  }
})()