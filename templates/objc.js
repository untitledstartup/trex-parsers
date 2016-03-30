(function() {
  
  
  
  
  module.exports = {
    "samples": [
      "TMLLocalizedString(<fixtures>)"
    ],
    "fixtures": {
      "success": {
        "nil": "nil",
        "NSNull": "[NSNull null]",
        
        "simpleVariable": "someVariable",
        "fancyVariable": "_$ome_123variable",
        
        "define": "SOMETHING_DEFINED",
        
        "simpleProperty": "foo.bar",
        "longSimpleProperty": "foo.bar.baz.baaz",
        
        "emptyArray": '@[]',
        "shortArray": '@[@"foo"]',
        "longArray": '@[@"foo", @1, @(1), @0, @(0.3), @0.3, @YES, @NO, someObject]',
        
        "emptyDict": '@{}',
        "shortDict": '@{@"foo": @"Bar"}'
        "longDict": '@{@"foo": @1, @"bar": @(1), someVariable: @0, @"float": @(0.3), @"anotherFloat": @0.3, @"true": @YES, @"false": @NO, anObj: someObject}',
        
        "methodCall": 'someMethod()',
        
        "noargMessageSend": '[self noarg]',
        "simpleArgMessageSend": '[self foo:@"Foo" bar: 1  baz:@YES]',
        
        "property": 'foo.bar'
      },
      "error": {
        "": "",
        "\n": "\n",
        "\0": "\0"
      }
    }
  }
  
  
})();
