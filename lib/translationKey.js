(function(){
  var MD5=require('./MD5');
  function TranslationKey(label, description) {
    this.label = label;
    this.description = description;
    var l = (label) ? label : "";
    var d = (description) ? description : "";
    this.id = MD5(l + ";;;" + d);
  }
  module.exports = TranslationKey;
})()