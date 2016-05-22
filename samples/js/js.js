function() {
  var myString = attr("1. String only");
  var anotherString = tr("2. String with description", "This is the description");
  var singleQuotesMyString = tr('3. String only');
  var singleQuoteAnotherString = tr("4. String with description", "This is the description");
  var withToken = tr("5. String with {token}", {"token": "my token"});
  var withTMLToken = tr("6. String with {token}", "a description", {"token": tr("my localized token")});
  
  // var myString = tr("String only");
  // var anotherString = tr("String with description", "This is the description");
  // var withTMLToken = tr("String with {token}", {"token": tr("my token")});
  // var tert = tr((really ? "One of two" : "Second of two"), "Description");
  // var tert = tr((really ? "One of two" : tr("Second of two")), "Description");
}