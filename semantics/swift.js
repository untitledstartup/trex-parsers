module.exports = {
  "attributes": {
    "translationKeys": {
      "ListOf_some": function(first, separator, iter) {
        var result = [];
        var firstString = first.translationKeys;
        if (firstString) {
          result.push(firstString);
        }
        var children = iter.children;
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          var childString = child.translationKeys;
          if (childString) {
            result.push(childString);
          }
        }
        return result;
      },
      "TMLLocalizedStrings": function(_, parts, tail) {
        var result = parts.translationKeys;
        var newResult = [];
        debugger;
        for (var i=0; i<result.length; i++) {
          var r = result[i];
          if (r instanceof Array) {
            newResult = newResult.concat(r);
          }
          else {
            newResult.push(r);
          }
        }
        return newResult;
      },
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
      "Macro": function(e) {
        return "";
      },
      "NamedArg": function(varName, sep, arg) {
        return arg.translationKeys;
      },
      "Arg": function(e) {
        return e.translationKeys;
      },
      "Null": function(e) {
        return "";
      },
      "Property": function(first, sep, seconds) {
        return "";
      },
      "Variable": function(parts) {
        return "";
      },
      "NumberLiteral": function(parts) {
        return "";
      },
      "StringLiteral": function(open, str, close) {
        return str.translationKeys;
      },
      "stringChars": function(parts) {
        var str = parts.translationKeys.join("");
        return str;
      },
      "stringChar": function(char) {
        return this.interval.contents;
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
