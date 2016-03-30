module.exports = {
  "attributes": {
    "translationKeys": {
      "ListOf_none": function() {
        return "";
      },
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
      "TMLLocalizedStrings": function(_, strings, _) {
        var result = strings.translationKeys;
        var newResult = [];
        for (var i = 0; i < result.length; i++) {
          var r = result[i];
          if (r instanceof Array) {
            newResult = newResult.concat(r);
          } else {
            newResult.push(r);
          }
        }
        return newResult;
      },
      "TMLLocalizedString": function(str) {
        return str.translationKeys;
      },
      "NullLiteral": function(e) {
        return "";
      },
      "BooleanLiteral": function(parts) {
        return "";
      },
      "Variable": function(first, rest) {
        return "";
      },
      "Literal": function(e) {
        return e.translationKeys;
      },
      "NumberLiteral": function(integers, _, decimals) {
        return "";
      },
      "Property": function(first, _, rest) {
        return "";
      },
      "Method": function(methodName, _, args, _) {
        return args.translationKeys;
      },
      // "StringLiteral": function(open, str, close) {
      //   var result = "";
      //   var strings = (str) ? str.translationKeys : null;
      //   debugger;
      //   if (strings && strings.length > 0) {
      //     result = strings.join("");
      //   }
      //   return result;
      // },
      "QuotedStringLiteral": function(_, str, _) {
        var result = str.translationKeys;
        debugger;
        return result;
      },
      "quotedStringChars": function(chars) {
        var result = "";
        var strings = (chars) ? chars.translationKeys : null;
        if (strings && strings.length > 0) {
          result = strings.join("");
        }
        debugger;
        return result;
      },
      "quotedChar_escaped": function(esc, char) {
        debugger;
        return this.interval.contents;
      },
      "Arg": function(e) {
        return e.translationKeys;
      },
      "ArgExp_parens": function(_, argExp, _) {
        return argExp.translationKeys;
      },
      "ArgExp_ternary": function(first, _, second, _, third) {
        var result = first.translationKeys;
        if (second && second.interval.contents.length > 0) {
          result = result.concat(second.translationKeys);
        }
        if (third && third.interval.contents.length > 0) {
          result = result.concat(third.translationKeys);
        }
        return result;
      },
      "ArgExp_binary": function(first, _, second) {
        var result = first.translationKeys;
        if (second && second.interval.contents.length > 0) {
          result = result.concat(second.translationKeys);
        }
        return result;
      },
      "ArgExp_unary": function(_, arg) {
        return arg.translationKeys;
      },
      "ArgExp_unaryAfter": function(arg, _) {
        return arg.translationKeys;
      }
    }
  }
}
