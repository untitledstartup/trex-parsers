(function(){
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        // Macro "(" StringObject ("," ArgExp)* ")" ";"*
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
        "Object": function(e) {
          return e.translationKeys;
        },
        "NumberObject": function(_, num) {
          return "";
        },
        "StringObject": function(_, str, _, additionalLines) {
          var result = str.translationKeys;
          if (!result || !result.label) {
            return null;
          }
          if (additionalLines && additionalLines.interval.contents.length > 0) {
            var additionalString = additionalLines.translationKeys;
            if (additionalString && additionalString.label) {
              result.label += "\n" + additionalString.label;
            }
          }
          return result;
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
        },
        "MessageSend": function(msg) {
          return "";
        },
        "NoArgumentMessageSend": function(_, receiver, messageName, _) {
          return "";
        },
        "ArgumentMessageSend": function(_, receiver, messageNames, args, _) {
          return args.translationKeys;
        },
        "MessageComponent": function(parts) {
          return "";
        },
        "messageComponentChar": function(e) {
          return "";
        }
      }
    }
  }
})()