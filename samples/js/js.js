function() {
  var nothing = attr("0. String only");
  var myString = tr("1. String only");
  var anotherString = tr("2. String with description", "This is the description");
  var singleQuotesMyString = tr('3. String only');
  var singleQuoteAnotherString = tr("4. String with description", "This is the description");
  var withToken = tr("5. String with {token}", {"token": "my token"});
  var withTMLToken = tr("6. String with {token}", "a description", {"token": tr("7. my localized token")});
  var tert = tr((really ? "8.1. One of two" : "8.2. Second of two"), "Description");
  var tert2 = tr((really ? "9.1. One of two" : tr("9.2. Second of two")), "Description");
  var concat = tr("10. Appending " + myString, "10. Description");
}