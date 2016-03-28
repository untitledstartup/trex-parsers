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
      "Variable": function(parts) {
        return "";
      },
      "Literal": function(e) {
        return e.translationKeys;
      },
      "NumberLiteral": function(parts) {
        return "";
      },
      "StringLiteral": function(open, str, close) {
        return str.translationKeys;
      },
      "stringChars": function(parts) {
        var result = "";
        var strings = (parts) ? parts.translationKeys : null;
        if (strings && strings.length > 0) {
          result = strings.join("");
        }
        return result;
      },
      "stringChar": function(char) {
        return this.interval.contents;
      }
    }
  }
}
