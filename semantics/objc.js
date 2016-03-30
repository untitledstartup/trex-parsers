(function(){
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        "TMLLocalizedString": function(macro, open, label, sep, args, close, semicolon) {
          var results = [];
          var labelString = label.translationKeys;
          if (labelString.length > 0) {
            results.push(labelString);
          }
          else {
            return null;
          }
          var argResult = args.translationKeys;
          if (argResult && argResult.length > 0) {
            var argStr = argResult[0];
            if (argStr instanceof Array) {
              argStr = argStr[0];
            }
            if (argStr) {
              results.push(argStr);
            }
          }
          var key = utils.createTranslationKey(results[0], results[1]);
          return key;
        },
        "Macro": function(e) {
          return "";
        },
        "Property": function(first, sep, seconds) {
          return "";
        },
        "Object": function(e) {
          return e.translationKeys;
        },
        "NumberObject": function(_, num) {
          return "";
        },
        "StringObject": function(_, str, _, additionalLines) {
          var result = str.translationKeys;
          if (additionalLines && additionalLines.interval.contents.length > 0) {
            var additionalString = additionalLines.translationKeys;
            if (additionalString) {
              result += "\n" + additionalString;
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