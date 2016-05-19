int main(int argc, char * argv[])
{
    @autoreleasepool {


TMLLocalizedString(@"1 Simple String", (2 + 3));
TMLLocalizedString(@"2 Emoji String 😀", (2 + 3));

TMLLocalizedString(@"3 TMLLocalizedString \"single\" 'argument'", (2 + 3));
TMLLocalizedString(@"4 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", (2 + 3));
TMLLocalizedString(@"5 TMLLocalizedString \"first\" 'argument' of two", (2 + 3), @"TMLLocalizedString \"second\" argument of two");

TMLLocalizedString(@"6 TMLLocalizedString \"single\" 'argument',\
  with multiple lines, using escape", (2 + 3));
TMLLocalizedString(@"7 TMLLocalizedString \"single\" 'argument',"
  @"with multiple lines, using @", (2 + 3));
TMLLocalizedString(@"8 TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, not using @", (2 + 3));

TMLLocalizedString(@"9 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", (really ? aha : ohnoes));
TMLLocalizedString(@"10 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", (really ? aha : ohnoes), @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"11 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", (really ? aha : ohnoes));
TMLLocalizedString(@"12 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", (really ? aha : ohnoes), @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"13 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'", (really ? aha : ohnoes));
TMLLocalizedString(@"14 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", (really ? aha : ohnoes), @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");

TMLLocalizedString(@"15 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", ([NSString stringWithFormat: @"%@", @"me"] ? @"me" : @"not me"));
TMLLocalizedString(@"16 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
([NSString stringWithFormat: @"%@", @"me"] ? @"me" : @"not me"),
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"17 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", 
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", 
([NSString stringWithFormat: @"%@", @"me"] ? @"me" : @"not me"));
TMLLocalizedString(@"18 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", ([NSString stringWithFormat: @"%@", @"me"] ? @"me" : @"not me"),
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"19 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
([NSString stringWithFormat: @"%@", @"me"] ? @"me" : @"not me"),
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");
TMLLocalizedString(@"20 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
([NSString stringWithFormat: @"%@", @"me"] ? @"me" : @"not me"));

TMLLocalizedString(@"21 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\""
    ,(2 + (3 - [NSNumber numberWithString:@"4"].intValue)), @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",(2 + (3 - [NSNumber numberWithString:@"4"].intValue)));
TMLLocalizedString(@"22 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"",(2 + (3 - [NSNumber numberWithString:@"4"].intValue))
    , @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",
(2 + (3 - [NSNumber numberWithString:@"4"].intValue)));
TMLLocalizedString(@"23 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'"
    ,(2 + (3 - [NSNumber numberWithString:@"4"].intValue))
      , @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'"
      ,(2 + (3 - [NSNumber numberWithString:@"4"].intValue)));
TMLLocalizedString(@"24 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'"
    , (2 + (3 - [NSNumber numberWithString:@"4"].intValue)),
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
(2 + (3 - [NSNumber numberWithString:@"4"].intValue)));


    }
}