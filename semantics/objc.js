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
      "Exp": function(_, parts, tail) {
        var result = parts.translationKeys;
        var newResult = [];
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
      "TMLExp": function(macro, open, label, sep, args, close, space, semicolon) {
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
      "ArgsExp": function(e) {
        return e.translationKeys;
      },
      "NullExp": function(e) {
        return "";
      },
      "PropertyExp": function(first, sep, seconds) {
        return "";
      },
      "VariableExp": function(parts) {
        return "";
      },
      "LiteralExp": function(e) {
        return e.translationKeys;
      },
      "ObjectExp": function(e) {
        return e.translationKeys;
      },
      "NumberExp": function(parts) {
        return "";
      },
      "NumberObjectExp": function(_, num) {
        return "";
      },
      "StringObjectExp": function(open, str, close, additionalLines) {
        var result = str.translationKeys;
        if (additionalLines && additionalLines.interval.contents.length > 0) {
          var additionalString = additionalLines.translationKeys;
          if (additionalString) {
            result += "\n" + additionalString;
          }
        }
        return result;
      },
      "StringObjectAdditionalLinesExp": function(open, str, close) {
        var result = str.translationKeys;
        if (result instanceof Array) {
          result = result.join("");
        }
        return result;
      },
      "StringExp": function(open, str, close) {
        return str.translationKeys;
      },
      "stringCharsExp": function(parts) {
        var result = "";
        var strings = (parts) ? parts.translationKeys : null;
        if (strings && strings.length > 0) {          
          result = strings.join("");
        }
        return result;
      },
      "stringChar": function(char) {
        return this.interval.contents;
      },
      "BeginStringQuote": function(e) {
        return "";
      },
      "BeginSecondLineStringQuote": function(e) {
        return "";
      },
      "EndStringQuote": function(e) {
        return "";
      },
      "DictExp": function(open, parts, close) {
        return "";
      },
      "DictEntryExp": function(key, _, val) {
        return "";
      },
      "DictValueExp": function(e) {
        return e.translationKeys;
      },
      "ArrayExp": function(open, parts, close) {
        return "";
      },
      "ArrayEntryExp": function(e) {
        return e.translationKeys;
      },
      "CollectionAccessExp": function(varname, open, arg, close) {
        return "";
      },
      "MessageExp": function(msg) {
        return "";
      },
      "NoArgumentMessageExp": function(ope, receiver, message, close) {
        return "";
      },
      "ArgumentMessageExp": function(open, receiver, messages, args, close) {
        return "";
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
