// Node requires
var fs = require('file-system');
var Genstrings = require('./lib/genstrings.js');

// Configuration Variables. Modify Theses!
var genstringsMacro = "NSLocalizedString";
var genstringsLanguage = "swift";
var folderPath = '../../TestProjects/FirstTranslation/FirstTranslation'; // The relative folder path which contains the files you want to parse
var filePathFilter = ['**/*.swift']; // File path filters, is passed into `fs.recurseSync` see https://www.npmjs.com/package/file-system#recursesyncdirpath-filter-callback
var outputFilePath = './parse_results.json';


// Script Variables. Do NOT Touch!
var genstrings = new Genstrings();
genstrings.macro = genstringsMacro;
genstrings.language = genstringsLanguage;
var translationKeysArray = []; // Where all the translation keys from progress are kept, so we can output at the end


// Warning and Progess Callbacks
genstrings.on("warning", function(message, info) {
  console.log('warning :: ' + message + ' ::');
  console.log(info);
  console.log('');
});
genstrings.on("progress", function(progress, file, translationKeys) {
  console.log('progress :: ' + progress + ' :: ' + file + ' ::');
  translationKeysArray = translationKeysArray.concat(translationKeys); // Store for output at the end

  // If we have finished parsing the files, output all the translation keys
  if (progress >= 1)  {
    fs.writeFile(outputFilePath, JSON.stringify(translationKeysArray), function() {
      console.log('Script complete!! Output written to ' + outputFilePath);
    });
  }
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
