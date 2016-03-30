(function(){
  var md5 = require('./MD5');
  var Utils = {
    "generateTranslationKeyHash": function generateTranslationKeyHash(label, description) {
      var l = (label) ? label : "";
      var d = (description) ? description : "";
      return md5(l + ";;;" + d);
    },
    "createTranslationKey": function createTranslationKey(label, description) {
      if (!label || label.trim().length === 0) {
        return null;
      }
      var key = {
        "label": label
      };
      if (description && description.trim().length > 0) {
        key["description"] = description;
      }
      var hash = this.generateTranslationKeyHash(label, description);
      key["id"] = hash;
      return key;
    }
  };
  module.exports = Utils;
})()