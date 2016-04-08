(function(){
  
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        // Basic support
        "ListOf_none": function() {
          return null;
        },
        "ListOf_some": function(first, separator, iter) {
          var result = [];
          var firstString = utils.collectTranslationKeysFromObjects(first.translationKeys);
          debugger;
          if (firstString instanceof Array && firstString.length > 0) {
            result = result.concat(firstString);
          }
          var children = iter.children;
          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var childString = util.collectTranslationKeysFromObjects(child.translationKeys);
            if (childString) {
              result.push(childString);
            }
          }
          return result;
        },
        "listOf_none": function() {
          return null;
        },
        "listOf_some": function(first, separator, iter) {
          var result = [];
          var firstKey = utils.collectTranslationKeysFromObjects(first.translationKeys);
          debugger;
          if (firstKey instanceof Array && firstKey.length > 0) {
            result = result.concat(firstKey);
          }
          var children = iter.children;
          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var childKey = utils.collectTranslationKeysFromObjects(child.translationKeys);
            if (childKey instanceof Array && childKey.length > 0) {
              result = result.concat(childKey);
            }
          }
          return result;
        },
      
        // nonTMLLocalizedStringStatement* listOf<tmlLocalizedString, nonTMLLocalizedStringStatement+> nonTMLLocalizedStringStatement*
        "tmlLocalizedStrings": function(_, strings, tail) {
          var keys = utils.collectTranslationKeysFromObjects(strings.translationKeys);
          debugger;
          return keys;
        },
        // methodNamed<macro>
        "tmlLocalizedString": function(meth) {
          var results = utils.collectTranslationKeysFromObjects(meth.translationKeys);
          debugger;
          var key = results[0];
          var second = (results.length > 1) ? results[1] : null;
          if (second) {
            key = utils.createTranslationKey(key.label, second.label);
          }
          return [key];
        },
      
        // Literals
        "nullLiteral": function(e) {
          return null;
        },
        "booleanLiteral": function(parts) {
          return null;
        },
        "variable": function(first, rest) {
          return null;
        },
        "literal": function(e) {
          return e.translationKeys;
        },
        "numberLiteral": function(integers, _, decimals) {
          return null;
        },
      
        // Expressions
        "macro": function(e) {
          return null;
        },
        "property": function(first, _, rest) {
          return null;
        },
        // aMethodName "(" space* listOf<argExp, argSep > space* ")"
        "methodNamed": function(methodName, _, _, args, _, _) {
          return args.translationKeys;
        },
      
        // Strings
        "quotedStringLiteral": function(_, str, _) {
          var string = str.interval.contents;
          var key = utils.createTranslationKey(string);
          return [key];
        },
        "quotedStringChars": function(chars) {
          var string = chars.interval.contents;
          var key = utils.createTranslationKey(string);
          return [key];
        },
        // "quotedChar_escaped": function(esc, char) {
        //   return this.interval.contents;
        // },
      
        // Arguments
        "arg": function(arg) {
          return arg.translationKeys;
        },
        // "(" space* argExp space* ")"
        "argExp_parens": function(_, _, argExp, _, _) {
          return argExp.translationKeys;
        },
        // argExp space* ternaryOperator space* argExp space* ternaryOperator space* argExp
        "argExp_ternary": function(first, _, op, _, second, _, op, _, third) {
          var result = utils.collectTranslationKeysFromObjects(first.translationKeys, second.translationKeys, third.translationKeys);
          return result;
        },
        // argExp space* binaryOperator space* argExp
        "argExp_binary": function(first, _, op, _, second) {
          var result = utils.collectTranslationKeysFromObjects(first.translationKeys, second.translationKeys);
          return result;
        },
        // unaryOperator space* argExp
        "argExp_unary": function(op, _, arg) {
          return arg.translationKeys;
        },
        // argExp space* unaryOperator 
        "argExp_unaryAfter": function(arg, _, op) {
          return arg.translationKeys;
        },
      
        // XML
        // "<" space* tag space* listOf<xmlTagAttributeExp, space+> space* "/"? space* ">"
        "xmlTag": function(open, _, tag, _, attrs, _, _, _, close) {
          var keys = attrs.translationKeys;
          return keys;
        },
        // "<" space* tag (space+ ~(attr | ">") xmlTagAttributeExp)* space+ attr (space+ xmlTagAttributeExp)* space* "/"? space* ">"
        "xmlTagWithAttribute": function(open, _, tag, _, ignoreAttrs, _, attr, _, remainder, _, slash, _, close) {
          var keys = attr.translationKeys;
          debugger;
          return keys;
        },
        // xmlTagAttributeName ("=" xmlTagAttributeValue)?
        "xmlTagAttributeExp": function(attr, _, value) {
          debugger;
          if (value && value.interval.contents.length > 0) {
            return value.translationKeys;
          }
          return null;
        },
        // XMLTag<tag> content XMLCloseTag<tag>
        "xmlTagWithContent": function(tag, tagContent, close) {
          var keys = tagContent.translationKeys;
          debugger;
          return keys;
        },
        // XMLTagWithAttribute<tag, attr> content XMLCloseTag<tag>
        "xmlTagWithAttributeAndContent": function(tagWithAttr, content, close) {
          var keys = content.translationKeys;
          debugger;
          return keys;
        }
      }
    }
  }

})();