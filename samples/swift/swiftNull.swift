// With NSNull() Arguments

TMLLocalizedString("Simple String", NSNull())
TMLLocalizedString("Emoji String 😀", NSNull())

TMLLocalizedString("TMLLocalizedString \"single\" 'argument'", NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two", "TMLLocalizedString \"second\" argument of two", NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two", NSNull(), "TMLLocalizedString \"second\" argument of two")

TMLLocalizedString("TMLLocalizedString \"single\" 'argument',\
  with multiple lines, using escape", NSNull())
TMLLocalizedString("TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, using ", NSNull())
TMLLocalizedString("TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, not using ", NSNull())

TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", "\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", NSNull(), "\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'", "\"Second\" 'argument' of two,"
  "with multiple lines, using '@'", NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'", NSNull(), "\"Second\" 'argument' of two,"
  "with multiple lines, using '@'")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", "\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'", NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", NSNull(), "\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'")

TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
NSNull(),
"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'", 
"\"Second\" 'argument' of two,"
  "with multiple lines, using '@'", 
NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'", NSNull(),
"\"Second\" 'argument' of two,"
  "with multiple lines, using '@'")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
NSNull(),
"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
NSNull())

TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\""
    ,NSNull(), "\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"",NSNull()
    , "\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",
NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'"
    ,NSNull()
      , "\"Second\" 'argument' of two,"
  "with multiple lines, using '@'"
      ,NSNull())
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'"
    , NSNull(),
"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
NSNull())
