(function(){
  
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        // "{" space* listOf<dictEntry, argSep> space* "}"
        "dict": function(open, _, entries, _, close) {
          return entries.translationKeys;
        },
        // (stringLiteral | variable) space* ":" space* argExp
        "dictEntry": function(key, _, _, _, val) {
          return val.translationKeys;
        },
        // "[" space* listOf<argExp, argSep> space* "]"
        "array": function(open, _, items, _, close) {
          return items.translationKeys;
        }
      }
    }
  }

})();