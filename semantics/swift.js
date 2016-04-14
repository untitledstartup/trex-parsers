(function(){
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        "stringLiteral": function(strings, _) {
          var result = utils.collectTranslationKeysFromObjects(strings.translationKeys);
          if (!result) {
            return null;
          }
          var key = result[0];
          var label = key.label;
          for (var i=1; i<result.length; i++) {
            var r = result[i];
            if (r) {
              label += r.label;
            }
          }
          result = utils.createTranslationKey(label, key.description);
          result = utils.createResult("stringLiteral", result);
          return result;
        },
        "macro": function(e) {
          return null;
        },
        // "[" space* ":" space* "]"
        // "[" space* listOf<dictEntry, argSep> space* "]"
        "dict": function(open, _, parts, _, close) {
          var result = parts.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("dict", result);
          result.flatten();
          result.results = null;
          return result;
        },
        // stringLiteral space* ":" space* dictValue
        "dictEntry": function(key, _, _, _, val) {
          var result = val.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("dictEntry", result);
          return result;
        },
        "dictValue": function(e) {
          var result = e.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("dictValue", result);
          return result;
        },
        // "[" space* listOf<arrayEntry, argSep> space* "]"
        "array": function(open, _, parts, _, close) {
          var result = parts.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("array", result);
          result.flatten();
          result.results = null;
          return result;
        },
        "arrayEntry": function(e) {
          var result = e.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("array", result);
          return result;
        },
        // argExp "[" space* argExp space* "]"
        "collectionAccess": function(varname, open, _, arg, _, close) {
          var result = arg.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("array", result);
          result.flatten();
          result.results = null;
          return result;
        }
      }
    }
  }
})()