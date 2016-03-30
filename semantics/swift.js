module.exports = {
  "attributes": {
    "translationKeys": {
      "TMLLocalizedString": function(macro, open, label, sep, args, close) {
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
      "StringLiteral": function(strings) {
        var result = strings.translationKeys;
        if (result instanceof Array) {
          result = result.join("\n");
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
