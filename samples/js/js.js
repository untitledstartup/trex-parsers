function() {
  var myString = tr("String only");
  var anotherString = tr("String with description", "This is the description");
  var singleQuotesMyString = tr('String only');
  var singleQuoteAnotherString = tr("String with description", "This is the description");
  var withToken = tr("String with {token}", {"token": "my token"});
}