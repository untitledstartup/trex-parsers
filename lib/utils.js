(function() {
  var FS = require('fs');
  var Result = require('./result');
  var TranslationKey = require('./translationKey');

  Array.prototype._tmlCollectObjectsOfType = function _tmlCollectObjectsOfType(type) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
      var obj = this[i];
      if (obj === null || obj === undefined) {
        continue;
      }
      if (obj instanceof Result) {
        var results = obj.results;
        var subResults = obj.subResults;
        var parts = [];
        if (results) {
          parts = parts.concat(results);
        }
        if (subResults) {
          parts = parts.concat(subResults);
        }
        if (parts.length > 0) {
          obj = parts;
        }
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
  
  function nodeRecursiveDescription(node, indent) {
    var name = node.ctorName;
    var str = "";
    var indentStr = "  ";
    if (!indent) {
      indent = 0;
    }
    if (indent > 0) {
      for (var i=0; i<indent; i++) {
        str += indentStr;
      }
    }
    str += "[" + name + "]";
    console.log(str);
    var children = node.children;
    for (var i=0; i<children.length; i++) {
      nodeRecursiveDescription(children[i], indent+1);
    }
  }

  var Utils = {
// Parser Support
    "createTranslationKey": function createTranslationKey(label, description) {
      // debugger;
      if (!label || label.trim().length === 0) {
        return null;
      }
      var key = new TranslationKey(label, description);
      return key;
    },
    "createResult": function createResult(type, value) {
      var t = (typeof type == 'string') ? type : type.ctorName;
      var v = (typeof value == 'string') ? value : value.interval.contents;
      var result = {type: t, value: v};
      // debugger;
      // console.log(">>> " + JSON.stringify(result));
      return result;
    },
    
// FileSystem
    "fileExists": function fileExists(filePath) {
      var exists = false;
      try {
          var stat = FS.statSync(filePath);
          if (stat && stat.isFile()) {
            exists = true;
          }
      
      }
      catch (e) {
      }
      return exists;
    },
    "directoryExists": function directoryExists(dir) {
      var exists = false;
      try {
          var stat = FS.statSync(dir);
          if (stat && stat.isDirectory()) {
            exists = true;
          }
      
      }
      catch (e) {
      }
      return exists;
    },
    
// Collections
    "collectObjectsOfType": function collectObjectsOfType(type) {
      if (arguments.length <= 1) {
        return null;
      }
      var args = Array.prototype.slice.call(arguments);
      var result = args._tmlCollectObjectsOfType(type);
      if (result.length === 0) {
        return null;
      }
      return result;
    },
    "collectTranslationKeysFromObjects": function() {
      var args = Array.prototype.slice.call(arguments);
      args = [TranslationKey].concat(args);
      return this.collectObjectsOfType.apply(this, args);
    },
    "collectSemanticObjects": function collectSemanticObjects() {
      var args = Array.prototype.slice.call(arguments);
      args = [Object].concat(args);
      return this.collectObjectsOfType.apply(this, args);
    },
    "collectNodes": function collectNodes(startNode, callback) {
      if (typeof callback != 'function') {
        return null;
      }
      var result = [];

      if (callback(startNode)) {
        result.push(startNode);
      }
      var children = startNode.children;
      if (!children || children.length === 0) {
        return result;
      }
      for (var i = 0; i < children.length; i++) {
        var more = this.collectNodes(children[i], callback);
        if (more instanceof Array && more.length > 0) {
          result = result.concat(more);
        }
      }
      return result;
    },
    
// Debugging
    "nodeRecursiveDescription": nodeRecursiveDescription,
    "inspect": function(arg) {
      var u = require('util');
      console.log(u.inspect(arg, false, null));
    }
  };

  module.exports = Utils;
  
  global["__"] = Utils.inspect;
  global["$$"] = Utils.nodeRecursiveDescription;

})()
