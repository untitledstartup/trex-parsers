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
        var info = {"label": results[0]};
        if (results.length > 1) {
          info["description"] = results[1];
        }
        debugger;
        return info;
      },
      "Macro": function(e) {
        return "";
      },
      "Args": function(e) {
        return e.translationKeys;
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
