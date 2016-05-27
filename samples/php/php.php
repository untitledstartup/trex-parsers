<?php
// Basics
tre("1 Hello World")

tre("2 Invite", "An invitation"),
tre("3 Invite", "Action to invite someone")

// Data Tokens

tre("4 Hello {user}", array("user" => "Michael"))
tre("5 Hello {user}", array("user" => array($male, "Michael B.")))

tre("6 Hello {user}", array("user" => array($male, function($obj) { return $obj->name; } )))

tre("7 Hello {user}", array("user" => $male))
tre("8 Hello {user}", array("user" => array("object" => $male, "value" => "Tom")))

tre("9 Hello {user}", array("user" => array("object" => $male, "attribute" => "name")))
tre("10 Hello {user}", array("user" => array("object" => $male, "method" => "fullName")))
tre("11 Hello {user}", array("user" => array("object" => array("name" => "Alex"), "attribute" => "name")))

// Method Tokens

tre("12 Hello {user.name}, you are a {user.gender}", array("user" => $male))

// Piped Tokens

tre("13 You have {count|| one: message, other: messages}", array("count" => 5))
tre("14 You have {count|| message, messages}", array("count" => 1))
tre("15 You have {count|| message}", array("count" => 1))
tre("16 {user|| male: родился, female: родилась, other: родился/лась } в Россие.", array("user" => $male), array("locale" => "ru"))
tre("17 {user|| male: родился, female: родилась, other: родился/лась } в Россие.", array("user" => $female), array("locale" => "ru"))

// Implied Tokens

tre("18 {user| He, She} likes this movie. ", array("user" => $male))
tre("19 {user| He, She} likes this movie. ", array("user" => $female))
tr("20 {user| male: He, female: She} likes this movie.", array("user" => $male))
tr("21 {user| Born on}: ", array("user" => $male))

// Decoration Tokens
tre("22 Hello [bold: World]", array("bold" => function($value) { return "<strong>" . $value . "</strong>";} ))
tre("23 Hello [bold: World]", array("bold" => '<strong>{$0}</strong>'))
tre("24 Hello [bold: World]")

// Nested Tokens
tre("25 You have [link: {count||message}]", array(
    "count" => 10,
    "link" => function($value) { return "<a href='http://www.google.com'> $value </a>"; }
));

tre("26 [bold: {user}], you have [italic: [link: [bold: {count}] {count|message}]]!", array(
    "user" => $male,
    "count" => 10,
    "italic" => '<i>{$0}</i>',
    "bold" => '<strong>{$0}</strong>',
    "link" => function($value) { return "<a href='http://www.google.com'> $value </a>"; }
));

// HTML to TML Converter
trh("27 
    <p>Tr8n can even <b>convert HTML to TML</b>, <i>translate TML</i> and <u>substitute it back into HTML</u>.</p>
")


trh("28 
    <p>Tr8n can even <b style='font-size:20px;'>convert HTML to TML</b>, <i style='color:blue'>translate TML</i> and <u>substitute it back into HTML</u>.</p>
")

// Numeric Context Rules
for($i=0; $i<10; $i++) {
    tre("29 You have {count||message}", array("count" => $i))
}

// Gender Context Rules
tre("30 {actor} tagged {target} in a photo {target|he, she} just uploaded.", array("actor" => $male, "target" => $female))
tre("31 {actor} tagged {target} in a photo {target|he, she} just uploaded.", array("actor" => $female, "target" => $male))

// Language Cases
tre("32 This is {user::pos} photo", array("user" => $male))

// String Interpolation
tre("33 this is $variable and $another->one")
tre("34 This is {$another->variable} and ${$yet.another} and $last_one")

tr(<<<EOD
35. Example of string
spanning multiple lines
using heredoc syntax.
EOD;
)
?>