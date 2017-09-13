// Node requires
var fs = require('file-system');
var moment = require('moment');
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
var startEndTimeOutputFormat = 'MMM Do YYYY H:mm:ss ZZ';
var progressTimeOutputFormat = 'H:mm:ss ZZ';
var startTime = moment(); // To know how long it took and nice output in progress log

console.log('Starting Trex Parsers Srcipt!!!');
console.log(startTime.format(startEndTimeOutputFormat));
console.log('');
console.log('');

// Warning and Progess Callbacks
genstrings.on("warning", function(message, info) {
  console.log('[' + moment().format(progressTimeOutputFormat) + '] WARNING :: ' + message + ' ::');
  console.log(info);
  console.log('');
});
genstrings.on("progress", function(progress, file, translationKeys) {
  console.log('[' + moment().format(progressTimeOutputFormat) + '] progress :: ' + progress + ' :: ' + file + ' ::');
  translationKeysArray = translationKeysArray.concat(translationKeys); // Store for output at the end

  // If we have finished parsing the files, output all the translation keys
  if (progress >= 1)  {
    fs.writeFile(outputFilePath, JSON.stringify(translationKeysArray), function() {
      var endTime = moment();
      console.log('');
      console.log('');
      console.log(endTime.format(startEndTimeOutputFormat));
      console.log('Parse complete! Took ' + startTime.diff(endTime, 'minutes') + ' minutes!');
      console.log('Output written to ' + outputFilePath);
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
// console.log(filesToParse);
genstrings.parseFiles(filesToParse);
