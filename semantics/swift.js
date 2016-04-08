(function(){
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        "stringLiteral": function(strings, _) {
          var result = utils.collectTranslationKeysFromObjects(strings.translationKeys);
          debugger;
          if (!(result instanceof Array)) {
            return null;
          }
          var key = result[0];
          var label = key.label;
          for (var i=1; i<result.length; i++) {
            var r = result[i];
            label += "\n" + r.label;
          }
          result = utils.createTranslationKey(label, key.description);
          return [result];
        },
        "macro": function(e) {
          return null;
        },
        // "[" space* ":" space* "]"
        // "[" space* listOf<dictEntry, argSep> space* "]"
        "dict": function(open, _, parts, _, close) {
          return null;
        },
        // stringLiteral space* ":" space* dictValue
        "dictEntry": function(key, _, _, _, val) {
          return val.translationKeys;
        },
        "dictValue": function(e) {
          return e.translationKeys;
        },
        // "[" space* listOf<arrayEntry, argSep> space* "]"
        "array": function(open, _, parts, _, close) {
          return parts.translationKeys;
        },
        "arrayEntry": function(e) {
          return e.translationKeys;
        },
        // argExp "[" space* argExp space* "]"
        "collectionAccess": function(varname, open, _, arg, _, close) {
          return arg.translationKeys;
        }
      }
    }
  }
})()