int main(int argc, char * argv[])
{
    @autoreleasepool {


      // With Dict Arguments

      TMLLocalizedString(@"1 Simple String", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"2 Emoji String 😀", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });

      TMLLocalizedString(@"3 TMLLocalizedString \"single\" 'argument'", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"4 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"5 TMLLocalizedString \"first\" 'argument' of two", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      }, @"TMLLocalizedString \"second\" argument of two");

      TMLLocalizedString(@"6 TMLLocalizedString \"single\" 'argument',\
        with multiple lines, using escape", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"7 TMLLocalizedString \"single\" 'argument',"
        @"with multiple lines, using @", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"8 TMLLocalizedString \"single\" 'argument',"
        "with multiple lines, not using @", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });

      TMLLocalizedString(@"9 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"10 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      }, @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"11 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"12 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      }, @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"13 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"14 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      }, @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");

      TMLLocalizedString(@"15 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"16 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      },
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"17 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"18 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      },
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"19 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      },
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");
      TMLLocalizedString(@"20 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });

      TMLLocalizedString(@"21 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\""
          ,@{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      }, @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",@{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"22 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"",@{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      }
          , @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",
      @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"23 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'"
          ,@{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      }
            , @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'"
            ,@{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });
      TMLLocalizedString(@"24 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'"
          , @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      },
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      @{
      @"foo": @"Foo",  @"num": @3,
      @"bool": @(YES),
      @"variable": myVariable,
      @"inArray": myArray[0],
      @"inDict": myDict[@"foo"],
      @"array": @[@"foo", @"bar"],
      @"dict": @{@"another": @"Dict"},
      @"message": [self noarg],
      @"longerMessage": [self get:@"foo" with:nil with:[self arg]],
      @"NSNull": [NSNull null]
      });

    }
}
