(function(){
  var md5 = require('./MD5');
  
  function TranslationKey(label, description) {
    this.label = label;
    this.desc = description;
    var l = (label) ? label : "";
    var d = (description) ? description : "";
    this.id = md5(l + ";;;" + d);
  }
  
  Array.prototype._tmlCollectObjectsOfType = function _tmlCollectObjectsOfType(type) {
    var result = [];
    for (var i=0; i<this.length; i++) {
      var obj = this[i];
      if (obj === null || obj === undefined) {
        continue;
      }
      if (obj instanceof type) {
        result.push(obj);
        continue;
      }
      if (obj instanceof Array) {
        var found = obj._tmlCollectObjectsOfType(type);
        if (found && found.length > 0) {
          result = result.concat(found);
        }
      }
    }
    return result;
  }
  
  var Utils = {
    "createTranslationKey": function createTranslationKey(label, description) {
      if (!label || label.trim().length === 0) {
        return null;
      }
      var key = new TranslationKey(label, description);
      return key;
    },
    "collectTranslationKeysFromObjects": function() {
      if (arguments.length === 0) {
        return null;
      }
      var args = Array.prototype.slice.call(arguments);
      var result = [];
      for (var i=0; i<args.length; i++) {
        var obj = args[i];
        if (obj === null || obj === undefined) {
          continue;
        }
        if (obj instanceof TranslationKey) {
          result.push(obj);
        }
        if (obj instanceof Array) {
          var more = obj._tmlCollectObjectsOfType(TranslationKey);
          if (more instanceof Array && more.length > 0) {
            result = result.concat(more);
          }
        }
      }
      if (result.length === 0) {
        return null;
      }
      return result;
    }
  };
  module.exports = Utils;
})()