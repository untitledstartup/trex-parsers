TMLLocalizedString("Simple String", self.property)
TMLLocalizedString("Emoji String 😀", self.property)

TMLLocalizedString("TMLLocalizedString \"single\" 'argument'", self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two", "TMLLocalizedString \"second\" argument of two", self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two", self.property, "TMLLocalizedString \"second\" argument of two")

TMLLocalizedString("TMLLocalizedString \"single\" 'argument',\
  with multiple lines, using escape", self.property)
TMLLocalizedString("TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, using ", self.property)
TMLLocalizedString("TMLLocalizedString \"single\" 'argument',"
  "with multiple lines, not using ", self.property)

TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", "\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.property, "\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'", "\"Second\" 'argument' of two,"
  "with multiple lines, using '@'", self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'", self.property, "\"Second\" 'argument' of two,"
  "with multiple lines, using '@'")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", "\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'", self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", self.property, "\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'")

TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"", self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"", 
self.property,
"\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'", 
"\"Second\" 'argument' of two,"
  "with multiple lines, using '@'", 
self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'", self.property,
"\"Second\" 'argument' of two,"
  "with multiple lines, using '@'")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
self.property,
"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'")
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'", 
"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.property)

TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\""
    ,self.property, "\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,\
  with multiple lines, using \"escape\"",self.property
    , "\"Second\" 'argument' of two,\
  with multiple lines, using \"escape\"",
self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, using '@'"
    ,self.property
      , "\"Second\" 'argument' of two,"
  "with multiple lines, using '@'"
      ,self.property)
TMLLocalizedString("TMLLocalizedString \"first\" 'argument' of two,"
  "with multiple lines, not using '@'"
    , self.property,
"\"Second\" 'argument' of two,"
  "with multiple lines, not using '@'",
self.property)
