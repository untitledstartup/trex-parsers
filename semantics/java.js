(function(){
  var utils = require('../lib/utils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        // quotedStringLiteral<"\"", stringNonLiteral> (space* "+" space* stringLiteral)*
        "stringLiteral": function(str, _, _, _, additional) {
          var keys = utils.collectTranslationKeysFromObjects(str.translationKeys);
          if (!(keys instanceof Array && keys.length > 0)) {
            return null;
          }
          var key = keys[0];
          var label = (key && key.label) ? key.label : "";
          if (additional && additional.interval.contents.length > 0) {
            var children = additional.children;
            for (var i=0; i<children.length; i++) {
              var str = children[i].interval.contents;
              str = str.substring(1, str.length - 1);
              label += str;
            }
          }
          key = utils.createTranslationKey(label, key.description);
          var result = utils.createResult("stringLiteral", key);
          return result;
        },
        // validFirstVarChar validVarChar* space* generics?
        "variable": function(first, rest, _, generics) {
          return null;
        },
        // "<" space* listOf<(property | variable), argSep> space* ">"
        "generics": function(open, _, props, _, close) {
          return null;
        },
        // "new" space+ methodName space* generics? space* "(" space* ListOf<ArgExp, argSep> space* ")"
        "newObject":function(keyword, _, methodName, _, generics, _, open, _, args, _, close) {
          var result = args.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("newObject", result);
          result.flatten();
          result.results = null;
          return result;
        },
        // argExp "[" space* argExp space* "]"
        "collectionAccess": function(exp, open, _, indexExp, _, close) {
          var result = utils.collectTranslationKeysFromObjects(exp.translationKeys, indexExp.translationKeys);
          if (!result) {
            return null;
          }
          result = utils.createResult("collectionAccess", result);
          result.flatten();
          result.results = null;
          return result;
        }
      }
    }
  }
})()