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
          result = utils.createResult("ListOf_some", result);
          debugger;
          return result;
        },
        "listOf_none": function() {
          return null;
        },
        "listOf_some": function(first, separator, iter) {
          var result = [];
          var firstKey = first.translationKeys;
          if (firstKey) {
            result.push(firstKey);
          }
          var children = iter.children;
          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var childKey = child.translationKeys;
            if (childKey) {
              result.push(childKey);
            }
          }
          result = utils.createResult("listOf_some", result);
          debugger;
          return result;
        },
      
        // space* listOf<(tmlStatement|nonTMLStatement), statementSep+> (statementSep|space)*
        "tmlLocalizedStrings": function(_, statements, tail) {
          var result = statements.translationKeys;
          if (!result) {
            return null;
          }
          var keys = utils.collectTranslationKeysFromObjects(result);
          result = utils.createResult("tmlLocalizedStrings", keys);
          debugger;
          return result;
        },
        // methodNamed<macro>
        "tmlLocalizedString": function(meth) {
          var result = meth.translationKeys;
          debugger;
          if (!result) {
            return null;
          }
          result = utils.createResult("tmlLocalizedString", result);
          result.flatten();
          debugger;
          return result;
        },
        // ~tmlLocalizedString (~statementSep any)+
        "nonTMLStatement": function(chars) {
          return null;
        },
        // tmlLocalizedString
        "tmlStatement": function(tmlString) {
          var result = tmlString.translationKeys;
          if (!result) {
            return null;
          }
          var result = utils.createResult("tmlStatement", result);
          debugger;
          return result;
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
          var result = e.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("literal", result);
          debugger;
          return result;
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
          var meth = methodName.interval.contents;
          var match = methodName._node.grammar.match(meth, "macro");          
          if (!match.succeeded()) {
            return null;
          }
          
          var result = args.translationKeys;
          debugger;
          result.flatten();
          var keys = result.results;
          if (keys.length >= 2) {
            var label = null;
            var desc = null;
            for (var i=0; i<keys.length; i++) {
              var key = keys[i];
              if (!key) {
                continue;
              }
              if (!label) {
                label = key.label;
              }
              else if (!desc) {
                desc = key.label;
              }
              if (label && desc) {
                break;
              }
            }
            var newKey = utils.createTranslationKey(label, desc);
            result.results = [newKey];
          }
          result = utils.createResult("methodNamed", result);
          return result;
        },
      
        // Strings
        "quotedStringLiteral": function(_, str, _) {
          var string = str.interval.contents;
          var key = utils.createTranslationKey(string);
          var result = utils.createResult("quotedStringLiteral", key);
          debugger;
          return result;
        },
        "quotedStringChars": function(chars) {
          var string = chars.interval.contents;
          var key = utils.createTranslationKey(string);
          var result = utils.createResult("quotedStringChars", key);
          debugger;
          return result;
        },
      
        // Arguments
        "arg": function(arg) {
          var result = arg.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("arg", result);
          debugger;
          return result;
        },
        // "(" space* argExp space* ")"
        "argExp_parens": function(_, _, argExp, _, _) {
          var result = argExp.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("argExp_parens", result);
          debugger;
          return result;
        },
        // argExp space* ternaryOperator space* argExp space* ternaryOperator space* argExp
        "argExp_ternary": function(first, _, op, _, second, _, op, _, third) {
          var result = [];
          var firstKeys = first.translationKeys;
          if (firstKeys) {
            result.push(firstKeys);
          }
          var secondKeys = second.translationKeys;
          if (secondKeys) {
            result.push(secondKeys);
          }
          var thirdKeys = third.translationKeys;
          if (thirdKeys) {
            result.push(thirdKeys);
          }
          result = utils.createResult("argExp_ternary", result);
          debugger;
          return result;
        },
        // argExp space* binaryOperator space* argExp
        "argExp_binary": function(first, _, op, _, second) {
          var result = [first.translationKeys, second.translationKeys];
          if (!result) {
            return null;
          }
          result = utils.createResult("argExp_binary", result);
          debugger;
          return result;
        },
        // unaryOperator space* argExp
        "argExp_unary": function(op, _, arg) {
          var result = arg.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("argExp_unaryAfter", result);
          debugger;
          return result;
        },
        // argExp space* unaryOperator 
        "argExp_unaryAfter": function(arg, _, op) {
          var result = arg.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("argExp_unaryAfter", result);
          debugger;
          return result;
        },
      
        // XML
        // "<" space* tag space* listOf<xmlTagAttributeExp, space+> space* "/"? space* ">"
        "xmlTag": function(open, _, tag, _, attrs, _, _, _, close) {
          var keys = attrs.translationKeys;
          if (!keys) {
            return null;
          }
          var result = utils.createResult("xmlTag", keys);
          return result;
        },
        // "<" space* tag (space+ ~(attr | ">") xmlTagAttributeExp)* space+ attr (space+ xmlTagAttributeExp)* space* "/"? space* ">"
        "xmlTagWithAttribute": function(open, _, tag, _, ignoreAttrs, _, attr, _, remainder, _, slash, _, close) {
          var keys = attr.translationKeys;
          if (!keys) {
            return null;
          }
          var result = utils.createResult("xmlTagWithAttribute", keys);
          return result;
        },
        // xmlTagAttributeName ("=" xmlTagAttributeValue)?
        "xmlTagAttributeExp": function(attr, _, value) {
          var result = null;
          if (value && value.interval.contents.length > 0) {
            result = value.translationKeys;
          }
          if (!result) {
            return null;
          }
          result = utils.createResult("xmlTagAttributeExp", result);
          return result;
        },
        // XMLTag<tag> content XMLCloseTag<tag>
        "xmlTagWithContent": function(tag, tagContent, close) {
          var keys = tagContent.translationKeys;
          if (!keys) {
            return null;
          }
          var result = utils.createResult("xmlTagWithContent", keys);
          return result;
        },
        // XMLTagWithAttribute<tag, attr> content XMLCloseTag<tag>
        "xmlTagWithAttributeAndContent": function(tagWithAttr, content, close) {
          var keys = content.translationKeys;
          if (!keys) {
            return null;
          }
          var result = utils.createResult("xmlTagWithAttributeAndContent", keys);
          return result;
        }
      }
    }
  }

})();