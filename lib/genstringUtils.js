(function() {
  var md5 = require('./MD5');

  function TranslationKey(label, description) {
    this.label = label;
    this.desc = description;
    var l = (label) ? label : "";
    var d = (description) ? description : "";
    this.id = md5(l + ";;;" + d);
  }
  
  function Result(ctor, results, subResults) {
    this.ctorName = ctor;
    if (results) {      
      this.results = (results instanceof Array) ? results : [results];
    }
    if (subResults) {
      this.subResults = (subResults instanceof Array) ? subResults : [subResults];
    }
  }
  Result.prototype.ctorName = null;
  Result.prototype.results = null;
  Result.prototype.subResults = null;
  Result.prototype.node = null;
  Result.prototype.flatten = function flatten() {
    var results = this.results;
    var subResults = this.subResults;
    var newResults = [];
    var newSubResults = [];

    if (results) {
      for (var i=0; i<results.length; i++) {
        var result = results[i];
        if (result instanceof Result) {
          result.flatten();
          if (result.ctorName == "tmlLocalizedString") {
            if (result.subResults) {
              newSubResults = newSubResults.concat(result.subResults);
            }
            newSubResults = newSubResults.concat(result.results);
          }
          else {
            if (result.results) {
              newResults = newResults.concat(result.results);
            }
            if (result.subResults) {
              newSubResults = newSubResults.concat(result.subResults);
            }
          }
        }
        else {
          newResults.push(result);
        }
      }
    }

    if (subResults) {
      var allSubs = Utils.collectTranslationKeysFromObjects(subResults);
      if (allSubs) {        
        newSubResults = newSubResults.concat(allSubs);
      }
    }
    
    this.results = newResults;
    if (newSubResults.length > 0) {
      this.subResults = newSubResults;
    }
  };
  Result.prototype.clone = function() {
    var newResult = new Result(this.ctorName, this.results, this.subResults);
    return newResult;
  };

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

  var Utils = {
    "createTranslationKey": function createTranslationKey(label, description) {
      if (!label || label.trim().length === 0) {
        return null;
      }
      var key = new TranslationKey(label, description);
      return key;
    },
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
    "loadSemanticsData": function loadSemanticsData(semantics, data) {
      var superSemantics = semantics._getSemantics().super;
      var superOperations = (superSemantics) ? superSemantics.operations : {};
      var superAttributes = (superSemantics) ? superSemantics.attributes : {};
      var operations = data["operations"];
      if (operations) {
        for (var operationName in operations) {
          if (superOperations[operationName]) {
            semantics.extendOperation(operationName, operations[operationName]);
          } else {
            semantics.addOperation(operationName, operations[operationName]);
          }
        }
      }
      var attributes = data["attributes"];
      if (attributes) {
        for (var attrName in attributes) {
          if (superAttributes[attrName]) {
            semantics.extendAttribute(attrName, attributes[attrName]);
          } else {
            semantics.addAttribute(attrName, attributes[attrName]);
          }
        }
      }
    },
    "nodeRecursiveDescription": function nodeRecursiveDescription(node, indent) {
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
        this.nodeRecursiveDescription(children[i], indent+1);
      }
    },
    "createResult": function(rule, results, subResults) {
      var result = new Result(rule, results, subResults);
      return result;
    },
    "inspect": function(arg) {
      var u = require('util');
      console.log(u.inspect(arg, false, null));
    },
    "FILTER_ACCEPT": 0,
    "FILTER_REJECT": 1,
    "FILTER_SKIP": 2,
    "iterateNodes": function iterateNodes(startNode, callback) {
      var action = callback(startNode);
      if (action != this.FILTER_ACCEPT) {
        return;
      }
      var children = startNode.children;
      if (!children || children.length === 0) {
        return;
      }
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        action = callback(child);
        if (action == this.FILTER_SKIP) {
          continue;
        } else {
          this.iterateNodes(child, callback);
        }
      }
    }
  };

  module.exports = Utils;
  
  global["__"] = Utils.inspect;

})()
