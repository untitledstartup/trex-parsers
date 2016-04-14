function() {
  var myString = attr("String only");
  var anotherString = tr("String with description", "This is the description");
  var singleQuotesMyString = tr('String only');
  var singleQuoteAnotherString = tr("String with description", "This is the description");
  var withToken = tr("String with {token}", {"token": "my token"});
  var withTMLToken = tr("String with {token}", "a description", {"token": tr("my localized token")});
  
  // var myString = tr("String only");
  // var anotherString = tr("String with description", "This is the description");
  // var withTMLToken = tr("String with {token}", {"token": tr("my token")});
  // var tert = tr((really ? "One of two" : "Second of two"), "Description");
  // var tert = tr((really ? "One of two" : tr("Second of two")), "Description");
}