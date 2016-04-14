(function(){
  var utils = require('../lib/GenstringUtils');
  
  module.exports = {
    "attributes": {
      "translationKeys": {
        "object": function(e) {
          var result = e.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("object", result);
          return result;
        },
        "numberObject": function(_, num) {
          return null;
        },
        // "@" stringLiteral (space* "@"? StringLiteral)*
        "stringObject": function(_, str, _, _, additionalLines) {
          var result = utils.collectTranslationKeysFromObjects(str.translationKeys, additionalLines.translationKeys);
          if (!result || result.length === 0) {
            return null;
          }
          var key = null;
          if (result.length == 1) {
            key = result[0];
          }
          else if (result.length > 1) {
            var label = "";
            for (var i=0; i<result.length; i++) {
              label += result[i].label;
            }
            key = utils.createTranslationKey(label);
          }
          if (key == null) {
            return null;
          }
          result = utils.createResult("stringObject", key);
          return result;
        },
        // "@{" space* ListOf<dictEntry, argSep> space* "}"
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
        // stringObject space* ":" space* dictValue
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
        // "@[" space* ListOf<arrayEntry, argSep> space* "]"
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
          result = utils.createResult("arrayEntry", result);
          return result;
        },
        // argExp "[" space* argExp space* "]"
        "collectionAccess": function(varname, open, _, arg, _, close) {
          var result = arg.translationKeys;
          if (!result) {
            return null;
          }
          result.flatten();
          result.results = null;
          result = utils.createResult("collectionAccess", result);
          return result;
        },
        "messageSend": function(msg) {
          var result = msg.translationKeys;
          if (!result) {
            return null;
          }
          result.flatten();
          result.results = null;
          result = utils.createResult("messageSend", result);
          return result;
        },
        // "[" space* receiver space+ noArgumentMessage space* "]"
        "noArgumentMessageSend": function(open, _, receiver, _, messageName, _, close) {
          return null;
        },
        // "[" space* receiver (space+ argumentMessage)+ space* "]"
        "argumentMessageSend": function(open, _, receiver, _, argMessages, _, close) {
          var result = argMessages.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("argumentMessageSend", result);
          result.flatten();
          result.results = null;
          return result;
        },
        // messageComponent space* ":" space* argExp
        "argumentMessage": function(message, _, _, _, arg) {
          var result = arg.translationKeys;
          if (!result) {
            return null;
          }
          result = utils.createResult("argumentMessage", result);
          return result;
        }
      }
    }
  }
})()