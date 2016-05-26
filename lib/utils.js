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
  };
  
  Array.prototype.flatten = function flatten() {
    var flat = [];
    for (var i=0; i<this.length; i++) {
      var next = this[i];
      if (next instanceof Array) {
        var append = next.flatten();
        flat = flat.concat(append);
      }
      else {
        flat.push(next);
      }
    }
    return flat;
  };
  
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
      var node = (typeof type == 'object' && type.ctorName) ? type : null;
      var result = {type: t, value: v, node: node};
      // debugger;
      // console.log(">>> " + JSON.stringify(result));
      return result;
    },
    "debugDescriptionForNode": function debugDescriptionForNode(node) {
      var interval = node.interval;
      var src = interval.inputStream.source;
      var start = interval.startIdx;
      var end = interval.endIdx;
      var prefix = src.substring(0, start);
      var suffix = src.substring(end, src.length);
      
      var matches = prefix.match(/\n\r?|\r\n?/g);
      var lineCount = (matches) ? matches.length + 1 : 1;
      
      var displayStart = 0;
      var counter = start;
      if (lineCount > 0) {
        while (counter >= 0) {
          if (prefix.charAt(counter) == "\n") {
            break;
          }
          counter--;
        }
        displayStart = counter + 1;
      }
      
      var displayEnd = end;
      counter = end;
      while (counter < src.length) {
        if (src.charAt(counter) == "\n") {
          break;
        }
        counter++;
      }
      displayEnd = counter - 1;
      
      var displayString = src.substring(displayStart, displayEnd);
      displayString += "\n";
      for (var i=0; i<=(start - displayStart + 1); i++) {
        displayString += " ";
      }
      displayString += "^";
      return {
        'line': lineCount,
        'column': start-displayStart + 1,
        'displayString': displayString
      };
    },
    "filterNodes": function (node, callback) {
      var results = [];
      if (callback(node)) {
        results.push(node);
      }
      var children = node.children;
      if (!children || children.length === 0) {
        return results;
      }
      
      for (var i=0; i<children.length; i++) {
        var child = children[i];
        var found = this.filterNodes(child, callback);
        if (found && found.length > 0) {
          results = results.concat(found);
        }
      }
      return results;
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
