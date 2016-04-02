(function(){
  
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        // Basic support
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
      
        // TMLLocalizedStrings
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
      
        // Literals
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
      
        // Expressions
        "Property": function(first, _, rest) {
          return "";
        },
        "MethodNamed": function(methodName, _, args, _) {
          return args.translationKeys;
        },
      
        // Strings
        "QuotedStringLiteral": function(_, str, _) {
          var string = str.interval.contents;
          var key = utils.createTranslationKey(string);
          return key;
        },
        "quotedStringChars": function(chars) {
          var string = chars.interval.contents;
          var key = utils.createTranslationKey(string);
          return key;
        },
        // "quotedChar_escaped": function(esc, char) {
        //   return this.interval.contents;
        // },
      
        // Arguments
        "Arg": function(arg) {
          return arg.translationKeys;
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
        },
      
        // XML
        // "<" tag XMLTagAttributeExp* "/"? ">"
        "XMLTag": function(open, tag, attrs, _, close) {
          var key = attrs.translationKeys;
          debugger;
          return key;
        },
        // "<" tag (~(attr | ">") XMLTagAttributeExp)* attr XMLTagAttributeExp* "/"? ">"
        "XMLTagWithAttribute": function(open, tag, ignoreAttrs, attr, remainder, _, close) {
          debugger;
          return attr.translationKeys;
        },
        // XMLTagAttributeName ("=" XMLTagAttributeValue)?
        "XMLTagAttributeExp": function(attr, _, value) {
          debugger;
          if (value && value.interval.contents.length > 0) {
            return value.translationKeys;
          }
          return "";
        },
        // XMLTag<tag> content XMLCloseTag<tag>
        "XMLTagWithContent": function(tag, tagContent, close) {
          debugger;
          return tagContent.translationKeys;
        },
        // XMLTagWithAttribute<tag, attr> content XMLCloseTag<tag>
        "XMLTagWithAttributeAndContent": function(tagWithAttr, content, close) {
          debugger;
          return content.translationKeys;
        }
      }
    }
  }

})();