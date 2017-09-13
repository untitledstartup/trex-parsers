// Node requires
var fs = require('file-system');
var Genstrings = require('./lib/genstrings.js');

// Configuration Variables. Modify Theses!
var genstringsMacro = "NSLocalizedString";
var genstringsLanguage = "swift";
var folderPath = '../../TestProjects/FirstTranslation/FirstTranslation'; // The relative folder path which contains the files you want to parse
var filePathFilter = ['**/*.swift']; // File path filters, is passed into `fs.recurseSync` see https://www.npmjs.com/package/file-system#recursesyncdirpath-filter-callback


// Script Variables. Do NOT Touch!
var genstrings = new Genstrings();
genstrings.macro = genstringsMacro;
genstrings.language = genstringsLanguage;


// Warning and Progess Callbacks
genstrings.on("warning", function(message, info) {
  console.log('warning :: ' + message + ' ::');
  console.log(info);
});
genstrings.on("progress", function(progress, file, translationKeys) {
  console.log('progress :: ' + progress + ' ::');
  console.log(file);
  console.log(translationKeys);
});


// Get all the paths to the files we need to parse
var filesToParse = [];
fs.recurseSync(folderPath, filePathFilter, function(filepath, relative, filename) {
  if (filename) {
    filesToParse.push(filepath);
  }
})

// Do the parsing!!!!
genstrings.parseFiles(filesToParse);
