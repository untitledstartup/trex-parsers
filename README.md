<p align="center">
  <img src="https://avatars0.githubusercontent.com/u/1316274?v=3&s=200">
</p>

Translation Exchange Code Parsers
===

[![NPM](https://nodei.co/npm/trex-parsers.png?downloads=true)](https://nodei.co/npm/trex-parsers)

TML extractors for Translation Exchange platform.


Notes
==================
### To use the new self-contained `runthis.js` checkout branch `brick/self-contained`

__genstrings__, the command-line utilty, is primary concerned with handling CLI interface. Most of the functionality lies in _lib/genstrintg.js_. From here on, Genstrings is used to refer to either the CLI or the supporting library...

Genstrings works by tokenizing input into various types of tokens. In its most basic form - tokens can be: literals (strings, numbers), operators, or named tokens. For example, the following snippet:

```
var foo = tr("Hello World");
```

would produce the following tokens:

```
namedToken namedToken operator namedToken operator string operator operator
```

The actual tokenization is done using [Ohm-js](https://github.com/cdglabs/ohm). The rationale behind this was: PEGs can tokenize and it's probably easier to extend functionality of the parser using simple grammar rules, as opposed to tweaking code.

Putting it all together:

```
var genstrings = new Genstrings();
genstrings.macro = "tr";
genstrings.language = "js";
genstrings.on("warning", function(message, info){...});
genstrings.on("progress", function(progress, file, translationKeys) {...})
genstrings.parseFiles(['/path/to/file.js']);
```

_macro_ here is your localization function, if you will. _language_ instructs Genstrings to utilize specific grammar for tokenizing input.

Genstrings inherits from EventEmitter, and emits _warnings_ and _progress_ events. Warnings are emitted whenever Genstrings finds dynamic strings or unexpected constructs (say you're passing a variable instead of a static string, or dynamically constructing strings). Genstrings ignores things that it emits warnings about... Progress event gets emitted once for each file that's being parsed. Arguments to the handler function will include particulars about progress, file and the translation keys.

You can provide your own parser to Genstrings:

```
var tokenParser = TokenParser.parserForLanguage('ruby');
var markupParser = new MarkupTokenParser(tokenParser);
markupParser.openMarkup = "<%=";
markupParser.closeMarkup = "%>";
var genstrings = new Genstrings(markupParser);
```

We've effectively told __Genstrings__ to use __MarkupTokenParser__ for tokenizing input; and we've setup __MarkupTokenParser__ so that it uses a parser for __ruby__ language for tokenizing special markup. What does this mean? Consider the following example:

```
<label><%= tr('Username') %><input placeholder="<%= tr('Your username')%>">
```

We are using __MarkupTokenParser__ to tokenize special markup, delimitted using <% %>, from an XML input (__MarkupTokenParser__ subclasses __XMLTokenParser__), and using a parser for __ruby__ language to tokenize contents of that markup, so _"tr()"_ statements.

__TokenParser__'s utilize Ohm parser for tokenizing input, and then processing those tokens while looking for localizable strings.

###Customizing

When customizing, you have to conside two things - Ohm grammar describing various tokens that a token parser would need; and a Token Parser to parse found tokens.

At its most basic, you'd be creating a subgrammar of _base.ohm_, redefining existing rules for various tokens, and possible adding your own rules... Look at the grammar directory for examples. Save your grammar by naming files with the language that it represents.

TokenParser handles basic c-style languages, by parsing out token series like:

```
macro openExpressionOperator string string? closeExpressionOperator
```

it's a little smarter than that, as it would skip other non-string tokens and would assign first found strings to a translation key's label and the second one to translation key's comment. So,

```
tr("Cancel", "Title for cancel button")
```

Would produce a translation key with label="Cancel" and description="Title for cancel button".

You'd have to subclass TokenParser and override processTokens method to provide your own logic for parsing out translation keys from a series of tokens. Just as with grammar files, name your Token Parsers by prefixing TokenParser with the language name (i.e. GoTokenParser)...

There is a subset of both grammar and token parser for dealing with XML documents: xml.ohm and xmlTokenParser.js. So, if you're considering parsing XML documents - subclass those files for your purposes...


Links
==================

* Register on TranslationExchange.com: https://translationexchange.com

* Follow TranslationExchange on Twitter: https://twitter.com/translationx

* Connect with TranslationExchange on Facebook: https://www.facebook.com/translationexchange

* If you have any questions or suggestions, contact us: support@translationexchange.com


Copyright and license
==================

Copyright (c) 2016 Translation Exchange, Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
