Tml.translate("1 Hello World");
Tml.translate("2 You have {count||message}", Utils.buildMap("count", 5));
Tml.translate("3 You have [indent: {count||message}]", Utils.buildMap(
                "count", 5,
                "indent", "<strong>{$0}</strong>"
));


Tml.translate("4 Hello {user}", Utils.buildMap("user", current_user));
Tml.translate("5 {count||message}", Utils.buildMap("count", counter));

Tml.translate("6 Hello {user}", Utils.buildMap("user", Utils.buildList(current_user, "Michael")));
Tml.translate("7 Hello {user}", Utils.buildMap("user", Utils.buildList(current_user, current_user.name)));

Tml.translate("8 Hello {user}", Utils.buildMap("user", Utils.buildMap(
  "object", Utils.buildMap(
    "name", "Michael",
    "gender", "male"
  ))));

Tml.translate("9 Hello {user}", new User("Michael", "male"));

Tml.translate("10 {user| He, She}", Utils.buildMap("user", Utils.buildMap(
"name", "Michael",
"gender", "male"
)));



/* With descriptions */
Tml.translate("11 Hello World", "A description");
Tml.translate("12 You have {count||message}", "A description", Utils.buildMap("count", 5));
Tml.translate("13 You have [indent: {count||message}]", "A description", Utils.buildMap(
                "count", 5,
                "indent", "<strong>{$0}</strong>"
));


Tml.translate("14 Hello {user}", "A description", Utils.buildMap("user", current_user));
Tml.translate("15 {count||message}", "A description", Utils.buildMap("count", counter));

Tml.translate("16 Hello {user}", "A description", Utils.buildMap("user", Utils.buildList(current_user, "Michael")));
Tml.translate("17 Hello {user}", "A description", Utils.buildMap("user", Utils.buildList(current_user, current_user.name)));

Tml.translate("18 Hello {user}", "A description", Utils.buildMap("user", Utils.buildMap(
  "object", Utils.buildMap(
    "name", "Michael",
    "gender", "male"
  ))));

Tml.translate("19 Hello {user}", "A description", new User("Michael", "male"));

Tml.translate("20 {user| He, She}", "A description", Utils.buildMap("user", Utils.buildMap(
"name", "Michael",
"gender", "male"
)));


// String concatenated
Tml.translate("21 Hello World" + " Part 2", "A description" + " Part 2");
Tml.translate("22 You have {count||message}" + " Part 2", "A description" + " Part 2", Utils.buildMap("count", 5));
Tml.translate("23 You have [indent: {count||message}]" + " Part 2", "A description", Utils.buildMap(
                "count", 5,
                "indent", "<strong>{$0}</strong>"
));


Tml.translate("24 Hello {user}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", current_user));
Tml.translate("25 {count||message}" + " Part 2", "A description" + " Part 2", Utils.buildMap("count", counter));

Tml.translate("26 Hello {user}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", Utils.buildList(current_user, "Michael")));
Tml.translate("27 Hello {user}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", Utils.buildList(current_user, current_user.name)));

Tml.translate("28 Hello {user}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", Utils.buildMap(
  "object", Utils.buildMap(
    "name", "Michael",
    "gender", "male"
  ))));

Tml.translate("29 Hello {user}" + " Part 2", "A description" + " Part 2", new User("Michael", "male"));

Tml.translate("30 {user| He, She}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", Utils.buildMap(
"name", "Michael",
"gender", "male"
)));
