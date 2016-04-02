Tml.translate("Hello World");
Tml.translate("You have {count||message}", Utils.buildMap("count", 5));
Tml.translate("You have [indent: {count||message}]", Utils.buildMap(
                "count", 5,
                "indent", "<strong>{$0}</strong>"
));


Tml.translate("Hello {user}", Utils.buildMap("user", current_user));
Tml.translate("{count||message}", Utils.buildMap("count", counter));

Tml.translate("Hello {user}", Utils.buildMap("user", Utils.buildList(current_user, "Michael")));
Tml.translate("Hello {user}", Utils.buildMap("user", Utils.buildList(current_user, current_user.name)));

Tml.translate("Hello {user}", Utils.buildMap("user", Utils.buildMap(
  "object", Utils.buildMap(
    "name", "Michael",
    "gender", "male"
  )));

Tml.translate("Hello {user}", new User("Michael", "male"));

Tml.translate("{user| He, She}", Utils.buildMap("user", Utils.buildMap(
"name", "Michael",
"gender", "male"
));



/* With descriptions */
Tml.translate("Hello World", "A description");
Tml.translate("You have {count||message}", "A description", Utils.buildMap("count", 5));
Tml.translate("You have [indent: {count||message}]", "A description", Utils.buildMap(
                "count", 5,
                "indent", "<strong>{$0}</strong>"
));


Tml.translate("Hello {user}", "A description", Utils.buildMap("user", current_user));
Tml.translate("{count||message}", "A description", Utils.buildMap("count", counter));

Tml.translate("Hello {user}", "A description", Utils.buildMap("user", Utils.buildList(current_user, "Michael")));
Tml.translate("Hello {user}", "A description", Utils.buildMap("user", Utils.buildList(current_user, current_user.name)));

Tml.translate("Hello {user}", "A description", Utils.buildMap("user", Utils.buildMap(
  "object", Utils.buildMap(
    "name", "Michael",
    "gender", "male"
  )));

Tml.translate("Hello {user}", "A description", new User("Michael", "male"));

Tml.translate("{user| He, She}", "A description", Utils.buildMap("user", Utils.buildMap(
"name", "Michael",
"gender", "male"
));


// String concatenated
Tml.translate("Hello World" + " Part 2", "A description" + " Part 2");
Tml.translate("You have {count||message}" + " Part 2", "A description" + " Part 2", Utils.buildMap("count", 5));
Tml.translate("You have [indent: {count||message}]" + " Part 2", "A description", Utils.buildMap(
                "count", 5,
                "indent", "<strong>{$0}</strong>"
));


Tml.translate("Hello {user}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", current_user));
Tml.translate("{count||message}" + " Part 2", "A description" + " Part 2", Utils.buildMap("count", counter));

Tml.translate("Hello {user}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", Utils.buildList(current_user, "Michael")));
Tml.translate("Hello {user}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", Utils.buildList(current_user, current_user.name)));

Tml.translate("Hello {user}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", Utils.buildMap(
  "object", Utils.buildMap(
    "name", "Michael",
    "gender", "male"
  )));

Tml.translate("Hello {user}" + " Part 2", "A description" + " Part 2", new User("Michael", "male"));

Tml.translate("{user| He, She}" + " Part 2", "A description" + " Part 2", Utils.buildMap("user", Utils.buildMap(
"name", "Michael",
"gender", "male"
));