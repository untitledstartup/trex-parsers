int main(int argc, char * argv[])
{
    @autoreleasepool {



      TMLLocalizedString(@"1 Simple String", array[@0]);
      TMLLocalizedString(@"2 Emoji String 😀", array[@0]);

      TMLLocalizedString(@"3 TMLLocalizedString \"single\" 'argument'", array[@0]);
      TMLLocalizedString(@"4 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", array[@0]);
      TMLLocalizedString(@"5 TMLLocalizedString \"first\" 'argument' of two", array[@0], @"TMLLocalizedString \"second\" argument of two");

      TMLLocalizedString(@"6 TMLLocalizedString \"single\" 'argument',\
        with multiple lines, using escape", array[@0]);
      TMLLocalizedString(@"7 TMLLocalizedString \"single\" 'argument',"
        @"with multiple lines, using @", array[@0]);
      TMLLocalizedString(@"8 TMLLocalizedString \"single\" 'argument',"
        "with multiple lines, not using @", array[@0]);

      TMLLocalizedString(@"9 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@0]);
      TMLLocalizedString(@"10 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@0], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"11 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@0]);
      TMLLocalizedString(@"12 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@0], @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"13 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'", array[@0]);
      TMLLocalizedString(@"14 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", array[@0], @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");

      TMLLocalizedString(@"15 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@0]);
      TMLLocalizedString(@"16 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      array[@0],
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"17 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      array[@0]);
      TMLLocalizedString(@"18 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@0],
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"19 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      array[@0],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");
      TMLLocalizedString(@"20 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[@0]);

      TMLLocalizedString(@"21 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\""
          ,array[@0], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[@0]);
      TMLLocalizedString(@"22 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[@0]
          , @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",
      array[@0]);
      TMLLocalizedString(@"23 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'"
          ,array[@0]
            , @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'"
            ,array[@0]);
      TMLLocalizedString(@"24 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'"
          , array[@0],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[@0]);








      TMLLocalizedString(@"25 Simple String", array[@(0)]);
      TMLLocalizedString(@"26 Emoji String 😀", array[@(0)]);

      TMLLocalizedString(@"27 TMLLocalizedString \"single\" 'argument'", array[@(0)]);
      TMLLocalizedString(@"28 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", array[@(0)]);
      TMLLocalizedString(@"29 TMLLocalizedString \"first\" 'argument' of two", array[@(0)], @"TMLLocalizedString \"second\" argument of two");

      TMLLocalizedString(@"30 TMLLocalizedString \"single\" 'argument',\
        with multiple lines, using escape", array[@(0)]);
      TMLLocalizedString(@"31 TMLLocalizedString \"single\" 'argument',"
        @"with multiple lines, using @", array[@(0)]);
      TMLLocalizedString(@"32 TMLLocalizedString \"single\" 'argument',"
        "with multiple lines, not using @", array[@(0)]);

      TMLLocalizedString(@"33 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@(0)]);
      TMLLocalizedString(@"34 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@(0)], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"35 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@(0)]);
      TMLLocalizedString(@"36 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@(0)], @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"37 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'", array[@(0)]);
      TMLLocalizedString(@"38 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", array[@(0)], @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");

      TMLLocalizedString(@"39 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@(0)]);
      TMLLocalizedString(@"40 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      array[@(0)],
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"41 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      array[@(0)]);
      TMLLocalizedString(@"42 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@(0)],
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"43 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      array[@(0)],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");
      TMLLocalizedString(@"44 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[@(0)]);

      TMLLocalizedString(@"45 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\""
          ,array[@(0)], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[@(0)]);
      TMLLocalizedString(@"46 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[@(0)]
          , @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",
      array[@(0)]);
      TMLLocalizedString(@"47 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'"
          ,array[@(0)]
            , @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'"
            ,array[@(0)]);
      TMLLocalizedString(@"48 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'"
          , array[@(0)],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[@(0)]);






      TMLLocalizedString(@"49 Simple String", array[@101]);
      TMLLocalizedString(@"50 Emoji String 😀", array[@101]);

      TMLLocalizedString(@"51 TMLLocalizedString \"single\" 'argument'", array[@101]);
      TMLLocalizedString(@"52 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", array[@101]);
      TMLLocalizedString(@"53 TMLLocalizedString \"first\" 'argument' of two", array[@101], @"TMLLocalizedString \"second\" argument of two");

      TMLLocalizedString(@"54 TMLLocalizedString \"single\" 'argument',\
        with multiple lines, using escape", array[@101]);
      TMLLocalizedString(@"55 TMLLocalizedString \"single\" 'argument',"
        @"with multiple lines, using @", array[@101]);
      TMLLocalizedString(@"56 TMLLocalizedString \"single\" 'argument',"
        "with multiple lines, not using @", array[@101]);

      TMLLocalizedString(@"57 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@101]);
      TMLLocalizedString(@"58 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@101], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"59 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@101]);
      TMLLocalizedString(@"60 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@101], @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"61 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'", array[@101]);
      TMLLocalizedString(@"62 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", array[@101], @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");

      TMLLocalizedString(@"63 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@101]);
      TMLLocalizedString(@"64 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      array[@101],
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"65 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      array[@101]);
      TMLLocalizedString(@"66 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@101],
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"67 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      array[@101],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");
      TMLLocalizedString(@"68 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[@101]);

      TMLLocalizedString(@"69 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\""
          ,array[@101], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[@101]);
      TMLLocalizedString(@"70 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[@101]
          , @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",
      array[@101]);
      TMLLocalizedString(@"71 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'"
          ,array[@101]
            , @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'"
            ,array[@101]);
      TMLLocalizedString(@"72 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'"
          , array[@101],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[@101]);






      TMLLocalizedString(@"73 Simple String", array[@(101)]);
      TMLLocalizedString(@"74 Emoji String 😀", array[@(101)]);

      TMLLocalizedString(@"75 TMLLocalizedString \"single\" 'argument'", array[@(101)]);
      TMLLocalizedString(@"76 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", array[@(101)]);
      TMLLocalizedString(@"77 TMLLocalizedString \"first\" 'argument' of two", array[@(101)], @"TMLLocalizedString \"second\" argument of two");

      TMLLocalizedString(@"78 TMLLocalizedString \"single\" 'argument',\
        with multiple lines, using escape", array[@(101)]);
      TMLLocalizedString(@"79 TMLLocalizedString \"single\" 'argument',"
        @"with multiple lines, using @", array[@(101)]);
      TMLLocalizedString(@"80 TMLLocalizedString \"single\" 'argument',"
        "with multiple lines, not using @", array[@(101)]);

      TMLLocalizedString(@"81 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@(101)]);
      TMLLocalizedString(@"82 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@(101)], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"83 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@(101)]);
      TMLLocalizedString(@"84 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@(101)], @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"85 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'", array[@(101)]);
      TMLLocalizedString(@"86 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", array[@(101)], @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");

      TMLLocalizedString(@"87 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[@(101)]);
      TMLLocalizedString(@"88 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      array[@(101)],
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"89 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      array[@(101)]);
      TMLLocalizedString(@"90 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[@(101)],
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"91 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      array[@(101)],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");
      TMLLocalizedString(@"92 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[@(101)]);

      TMLLocalizedString(@"93 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\""
          ,array[@(101)], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[@(101)]);
      TMLLocalizedString(@"94 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[@(101)]
          , @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",
      array[@(101)]);
      TMLLocalizedString(@"95 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'"
          ,array[@(101)]
            , @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'"
            ,array[@(101)]);
      TMLLocalizedString(@"96 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'"
          , array[@(101)],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[@(101)]);






      TMLLocalizedString(@"97 Simple String", array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"98 Emoji String 😀", array[[NSNumber numberWith:1]]);

      TMLLocalizedString(@"99 TMLLocalizedString \"single\" 'argument'", array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"100 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"101 TMLLocalizedString \"first\" 'argument' of two", array[[NSNumber numberWith:1]], @"TMLLocalizedString \"second\" argument of two");

      TMLLocalizedString(@"102 TMLLocalizedString \"single\" 'argument',\
        with multiple lines, using escape", array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"103 TMLLocalizedString \"single\" 'argument',"
        @"with multiple lines, using @", array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"104 TMLLocalizedString \"single\" 'argument',"
        "with multiple lines, not using @", array[[NSNumber numberWith:1]]);

      TMLLocalizedString(@"105 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"106 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[[NSNumber numberWith:1]], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"107 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"108 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[[NSNumber numberWith:1]], @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"109 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'", array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"110 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", array[[NSNumber numberWith:1]], @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");

      TMLLocalizedString(@"111 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"", array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"112 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"", 
      array[[NSNumber numberWith:1]],
      @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"");
      TMLLocalizedString(@"113 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'", 
      array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"114 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'", array[[NSNumber numberWith:1]],
      @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'");
      TMLLocalizedString(@"115 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      array[[NSNumber numberWith:1]],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'");
      TMLLocalizedString(@"116 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'", 
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[[NSNumber numberWith:1]]);

      TMLLocalizedString(@"117 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\""
          ,array[[NSNumber numberWith:1]], @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"118 TMLLocalizedString \"first\" 'argument' of two,\
        with multiple lines, using \"escape\"",array[[NSNumber numberWith:1]]
          , @"\"Second\" 'argument' of two,\
        with multiple lines, using \"escape\"",
      array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"119 TMLLocalizedString \"first\" 'argument' of two,"
        @"with multiple lines, using '@'"
          ,array[[NSNumber numberWith:1]]
            , @"\"Second\" 'argument' of two,"
        @"with multiple lines, using '@'"
            ,array[[NSNumber numberWith:1]]);
      TMLLocalizedString(@"120 TMLLocalizedString \"first\" 'argument' of two,"
        "with multiple lines, not using '@'"
          , array[[NSNumber numberWith:1]],
      @"\"Second\" 'argument' of two,"
        "with multiple lines, not using '@'",
      array[[NSNumber numberWith:1]]);


TMLLocalizedString(@"121 Simple String", self.my.array[@0]);
TMLLocalizedString(@"122 Emoji String 😀", self.my.array[@0]);

TMLLocalizedString(@"123 TMLLocalizedString \"single\" 'argument'", self.my.array[@0]);
TMLLocalizedString(@"124 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", self.my.array[@0]);
TMLLocalizedString(@"125 TMLLocalizedString \"first\" 'argument' of two", self.my.array[@0], @"TMLLocalizedString \"second\" argument of two");

TMLLocalizedString(@"126 TMLLocalizedString \"single\" 'argument',\
  with multiple lines, using escape", self.my.array[@0]);
TMLLocalizedString(@"127 TMLLocalizedString \"single\" 'argument',"
  @"with multiple lines, using @", self.my.array[@0]);
TMLLocalizedString(@"128 TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, not using @", self.my.array[@0]);

TMLLocalizedString(@"129 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@0]);
TMLLocalizedString(@"130 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@0], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"131 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@0]);
TMLLocalizedString(@"132 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@0], @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"133 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[@0]);
TMLLocalizedString(@"134 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[@0], @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");

TMLLocalizedString(@"135 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@0]);
TMLLocalizedString(@"136 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
self.my.array[@0],
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"137 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", 
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", 
self.my.array[@0]);
TMLLocalizedString(@"138 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@0],
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"139 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
self.my.array[@0],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");
TMLLocalizedString(@"140 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[@0]);

TMLLocalizedString(@"141 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\""
    ,self.my.array[@0], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[@0]);
TMLLocalizedString(@"142 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[@0]
    , @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",
self.my.array[@0]);
TMLLocalizedString(@"143 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'"
    ,self.my.array[@0]
      , @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'"
      ,self.my.array[@0]);
TMLLocalizedString(@"144 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'"
    , self.my.array[@0],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[@0]);








TMLLocalizedString(@"145 Simple String", self.my.array[@(0)]);
TMLLocalizedString(@"146 Emoji String 😀", self.my.array[@(0)]);

TMLLocalizedString(@"147 TMLLocalizedString \"single\" 'argument'", self.my.array[@(0)]);
TMLLocalizedString(@"148 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", self.my.array[@(0)]);
TMLLocalizedString(@"149 TMLLocalizedString \"first\" 'argument' of two", self.my.array[@(0)], @"TMLLocalizedString \"second\" argument of two");

TMLLocalizedString(@"150 TMLLocalizedString \"single\" 'argument',\
  with multiple lines, using escape", self.my.array[@(0)]);
TMLLocalizedString(@"151 TMLLocalizedString \"single\" 'argument',"
  @"with multiple lines, using @", self.my.array[@(0)]);
TMLLocalizedString(@"152 TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, not using @", self.my.array[@(0)]);

TMLLocalizedString(@"153 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@(0)]);
TMLLocalizedString(@"154 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@(0)], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"155 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@(0)]);
TMLLocalizedString(@"156 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@(0)], @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"157 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[@(0)]);
TMLLocalizedString(@"158 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[@(0)], @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");

TMLLocalizedString(@"159 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@(0)]);
TMLLocalizedString(@"160 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
self.my.array[@(0)],
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"161 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", 
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", 
self.my.array[@(0)]);
TMLLocalizedString(@"162 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@(0)],
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"163 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
self.my.array[@(0)],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");
TMLLocalizedString(@"164 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[@(0)]);

TMLLocalizedString(@"165 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\""
    ,self.my.array[@(0)], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[@(0)]);
TMLLocalizedString(@"166 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[@(0)]
    , @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",
self.my.array[@(0)]);
TMLLocalizedString(@"167 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'"
    ,self.my.array[@(0)]
      , @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'"
      ,self.my.array[@(0)]);
TMLLocalizedString(@"168 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'"
    , self.my.array[@(0)],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[@(0)]);






TMLLocalizedString(@"169 Simple String", self.my.array[@101]);
TMLLocalizedString(@"170 Emoji String 😀", self.my.array[@101]);

TMLLocalizedString(@"171 TMLLocalizedString \"single\" 'argument'", self.my.array[@101]);
TMLLocalizedString(@"172 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", self.my.array[@101]);
TMLLocalizedString(@"173 TMLLocalizedString \"first\" 'argument' of two", self.my.array[@101], @"TMLLocalizedString \"second\" argument of two");

TMLLocalizedString(@"174 TMLLocalizedString \"single\" 'argument',\
  with multiple lines, using escape", self.my.array[@101]);
TMLLocalizedString(@"175 TMLLocalizedString \"single\" 'argument',"
  @"with multiple lines, using @", self.my.array[@101]);
TMLLocalizedString(@"176 TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, not using @", self.my.array[@101]);

TMLLocalizedString(@"177 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@101]);
TMLLocalizedString(@"178 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@101], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"179 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@101]);
TMLLocalizedString(@"180 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@101], @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"181 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[@101]);
TMLLocalizedString(@"182 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[@101], @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");

TMLLocalizedString(@"183 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@101]);
TMLLocalizedString(@"184 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
self.my.array[@101],
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"185 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", 
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", 
self.my.array[@101]);
TMLLocalizedString(@"186 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@101],
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"187 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
self.my.array[@101],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");
TMLLocalizedString(@"188 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[@101]);

TMLLocalizedString(@"189 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\""
    ,self.my.array[@101], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[@101]);
TMLLocalizedString(@"190 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[@101]
    , @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",
self.my.array[@101]);
TMLLocalizedString(@"191 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'"
    ,self.my.array[@101]
      , @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'"
      ,self.my.array[@101]);
TMLLocalizedString(@"192 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'"
    , self.my.array[@101],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[@101]);






TMLLocalizedString(@"193 Simple String", self.my.array[@(101)]);
TMLLocalizedString(@"194 Emoji String 😀", self.my.array[@(101)]);

TMLLocalizedString(@"195 TMLLocalizedString \"single\" 'argument'", self.my.array[@(101)]);
TMLLocalizedString(@"196 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", self.my.array[@(101)]);
TMLLocalizedString(@"197 TMLLocalizedString \"first\" 'argument' of two", self.my.array[@(101)], @"TMLLocalizedString \"second\" argument of two");

TMLLocalizedString(@"198 TMLLocalizedString \"single\" 'argument',\
  with multiple lines, using escape", self.my.array[@(101)]);
TMLLocalizedString(@"199 TMLLocalizedString \"single\" 'argument',"
  @"with multiple lines, using @", self.my.array[@(101)]);
TMLLocalizedString(@"200 TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, not using @", self.my.array[@(101)]);

TMLLocalizedString(@"201 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@(101)]);
TMLLocalizedString(@"202 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@(101)], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"203 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@(101)]);
TMLLocalizedString(@"204 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@(101)], @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"205 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[@(101)]);
TMLLocalizedString(@"206 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[@(101)], @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");

TMLLocalizedString(@"207 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[@(101)]);
TMLLocalizedString(@"208 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
self.my.array[@(101)],
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"209 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", 
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", 
self.my.array[@(101)]);
TMLLocalizedString(@"210 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[@(101)],
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"211 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
self.my.array[@(101)],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");
TMLLocalizedString(@"212 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[@(101)]);

TMLLocalizedString(@"213 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\""
    ,self.my.array[@(101)], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[@(101)]);
TMLLocalizedString(@"214 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[@(101)]
    , @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",
self.my.array[@(101)]);
TMLLocalizedString(@"215 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'"
    ,self.my.array[@(101)]
      , @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'"
      ,self.my.array[@(101)]);
TMLLocalizedString(@"216 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'"
    , self.my.array[@(101)],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[@(101)]);






TMLLocalizedString(@"217 Simple String", self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"218 Emoji String 😀", self.my.array[[NSNumber numberWith:1]]);

TMLLocalizedString(@"219 TMLLocalizedString \"single\" 'argument'", self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"220 TMLLocalizedString \"first\" 'argument' of two", @"TMLLocalizedString \"second\" argument of two", self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"221 TMLLocalizedString \"first\" 'argument' of two", self.my.array[[NSNumber numberWith:1]], @"TMLLocalizedString \"second\" argument of two");

TMLLocalizedString(@"222 TMLLocalizedString \"single\" 'argument',\
  with multiple lines, using escape", self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"223 TMLLocalizedString \"single\" 'argument',"
  @"with multiple lines, using @", self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"224 TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, not using @", self.my.array[[NSNumber numberWith:1]]);

TMLLocalizedString(@"225 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"226 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[[NSNumber numberWith:1]], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"227 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"228 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[[NSNumber numberWith:1]], @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"229 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"230 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", self.my.array[[NSNumber numberWith:1]], @"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");

TMLLocalizedString(@"231 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"232 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
self.my.array[[NSNumber numberWith:1]],
@"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"");
TMLLocalizedString(@"233 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", 
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'", 
self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"234 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'", self.my.array[[NSNumber numberWith:1]],
@"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'");
TMLLocalizedString(@"235 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
self.my.array[[NSNumber numberWith:1]],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'");
TMLLocalizedString(@"236 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[[NSNumber numberWith:1]]);

TMLLocalizedString(@"237 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\""
    ,self.my.array[[NSNumber numberWith:1]], @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"238 TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.my.array[[NSNumber numberWith:1]]
    , @"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",
self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"239 TMLLocalizedString \"first\" 'argument' of two,"
  @"with multiple lines, using '@'"
    ,self.my.array[[NSNumber numberWith:1]]
      , @"\"Second\" 'argument' of two,"
  @"with multiple lines, using '@'"
      ,self.my.array[[NSNumber numberWith:1]]);
TMLLocalizedString(@"240 TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'"
    , self.my.array[[NSNumber numberWith:1]],
@"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.my.array[[NSNumber numberWith:1]]);


    }
}
