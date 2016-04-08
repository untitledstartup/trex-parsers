(function(){
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        "object": function(e) {
          return e.translationKeys;
        },
        "numberObject": function(_, num) {
          return null;
        },
        // "@" stringLiteral (space* "@"? StringLiteral)*
        "stringObject": function(_, str, _, _, additionalLines) {
          var result = utils.collectTranslationKeysFromObjects(str.translationKeys);
          debugger;
          if (!(result instanceof Array && result.length > 0)) {
            return null;
          }
          var key = result[0];
          if (additionalLines && additionalLines.interval.contents.length > 0) {
            var additionalKeys = additionalLines.translationKeys;
            if (additionalKeys instanceof Array && additionalKeys.length > 0) {
              var label = key.label;
              additionalKeys.forEach(function(aKey) {                
                label += "\n" + aKey.label;
              });
              key = utils.createTranslationKey(label, key.description);
            }
          }
          return [key];
        },
        // "@{" space* ListOf<dictEntry, argSep> space* "}"
        "dict": function(open, _, parts, _, close) {
          return parts.translationKeys;
        },
        // stringObject space* ":" space* dictValue
        "dictEntry": function(key, _, _, _, val) {
          return val.translationKeys;
        },
        "dictValue": function(e) {
          return e.translationKeys;
        },
        // "@[" space* ListOf<arrayEntry, argSep> space* "]"
        "array": function(open, _, parts, _, close) {
          return parts.translationKeys;
        },
        "arrayEntry": function(e) {
          return e.translationKeys;
        },
        // argExp "[" space* argExp space* "]"
        "collectionAccess": function(varname, open, _, arg, _, close) {
          return arg.translationKeys;
        },
        "messageSend": function(msg) {
          return msg.translationKeys;
        },
        // "[" space* receiver space+ noArgumentMessage space* "]"
        "noArgumentMessageSend": function(open, _, receiver, _, messageName, _, close) {
          return null;
        },
        // "[" space* receiver (space+ argumentMessage)+ space* "]"
        "argumentMessageSend": function(open, _, receiver, _, argMessage, _, close) {
          return argMessage.translationKeys;
        },
        // messageComponent space* ":" space* argExp
        "argumentMessage": function(message, _, _, _, arg) {
          return arg.translationKeys;
        }
      }
    }
  }
})()