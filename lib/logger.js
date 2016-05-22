(function() {
  
  var Colors = require('colors');
  
  function Logger() {
    var prefixMap = {};
    prefixMap[Logger.DEBUG_LEVEL] = "";
    prefixMap[Logger.INFO_LEVEL] = "";
    prefixMap[Logger.WARN_LEVEL] = "! ";
    prefixMap[Logger.ERROR_LEVEL] = "!!! ";
    this.prefixLevelMap = prefixMap;
    
    var colorMap = {};
    colorMap[Logger.DEBUG_LEVEL] = "normal";
    colorMap[Logger.INFO_LEVEL] = "bold";
    colorMap[Logger.WARN_LEVEL] = "yellow";
    colorMap[Logger.ERROR_LEVEL] = "red";
    this.colorLevelMap = colorMap;
  }
  
  var sharedLogger = null;
  Object.defineProperty(Logger, "sharedLogger", {
    enumerable: false,
    configurable: false,
    get: function getSharedLogger() {
      if (!sharedLogger) {
        sharedLogger = new Logger();
      }
      return sharedLogger;
    }
  });
  
  Logger.DEBUG_LEVEL = "DEBUG";
  Logger.INFO_LEVEL = "INFO";
  Logger.WARN_LEVEL = "WARN";
  Logger.ERROR_LEVEL = "ERROR";
  
  /**
   * Prefixing
   */ 
  Logger.prototype.prefixLevelMap = null;
  Logger.prototype.setPrefixForLevel = function setPrefixForLevel(prefix, level) {
    this.prefixLevelMap[level] = prefix;
  };
  
  /**
   * Colors
   */
  Logger.prototype.useColors = true;
  Logger.prototype.colorLevelMap = null;
  Logger.prototype.setColorForLevel = function setColorForLevel(color, level) {
    this.colorLevelMap[level] = color;
  };
  
  /**
   * Logging
   */
  Logger.prototype._log = function log(level, msg) {
    var outStr = msg;
    
    var prefix = this.prefixLevelMap[level];
    if (prefix) {
      outStr = prefix + outStr;
    }
    
    if (this.useColors && level) {
      var color = this.colorLevelMap[level];
      if (color) {
        outStr = outStr[color];
      }
    }
    
    var logMethod = null;
    switch(level) {
      case Logger.INFO_DEBUG:
        logMethod = "log";
        break;
      case Logger.INFO_LEVEL:
        logMethod = "info";
        break;
      case Logger.WARN_LEVEL:
        logMethod = "warn";
        break;
      case Logger.ERROR_LEVEL:
        logMethod = "error";
        break;
    }
    
    if (logMethod) {      
      console[logMethod](outStr);
    }
  };
  Logger.prototype.log = function(msg) {
    this._log(null, msg);
  }
  Logger.prototype.debug = function debug(msg) {
    this._log(Logger.DEBUG_LEVEL, msg);
  };
  Logger.prototype.info = function info(msg) {
    this._log(Logger.INFO_LEVEL, msg);
  };
  Logger.prototype.warn = function warn(msg) {
    this._log(Logger.WARN_LEVEL, msg);
  };
  Logger.prototype.error = function error(msg) {
    this._log(Logger.ERROR_LEVEL, msg);
  };
  
  module.exports = Logger;
  
})()