function() {
  var myString = attr("String only");
  var anotherString = attr("String with description", "This is the description");
  var singleQuotesMyString = attr('String only');
  var singleQuoteAnotherString = attr("String with description", "This is the description");
  var withToken = attr("String with {token}", {"token": "my token"});
  var withTMLToken = attr("String with {token}", "a description", {"token": tr("my localized token")});
}