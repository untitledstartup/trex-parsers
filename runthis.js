////// Node requires
var fs = require('file-system');
var moment = require('moment');
var underscorejs = require('underscore');
var Genstrings = require('./lib/genstrings.js');

var startTime = moment(); // To know how long it took and nice output in progress log
console.log('Starting Trex Parsers Srcipt!!!');
console.log(startTime.format(startEndTimeOutputFormat));
console.log('');

////// Config Variables. Edit These!!!!
var customConfigFilePath = './runthis_configs/banana.json'; // See `defaultOptions` below for what can be set
process.argv.forEach(function (val, index, array) {
  // The thrid argument is always the custom config path
  if (index === 2) {
    customConfigFilePath = val;
  }
});

console.log('Using custom config at :: ' + customConfigFilePath + ' ::');
console.log('');

////// Script Variables. Do NOT Touch!
var defaultOptions = {
  genstringsMacro: "localizationFunctionName",
  genstringsLanguage: "code language",
  folderPath: '../MyProject/theFiles', // The relative folder path which contains the files you want to parse
  filePathFilter: ['**/*.extension'], // File path filters, is passed into `fs.recurseSync` see https://www.npmjs.com/package/file-system#recursesyncdirpath-filter-callback
  outputFilePath: './parse_results.json',
  warningsOutputFilePath: './parse_warnings.json',
};
// Read in custom config and override the default options
var customConfigContent = fs.readFileSync(customConfigFilePath, 'utf8');
var options = underscorejs.extend({}, defaultOptions, JSON.parse(customConfigContent));
console.log('Using options:');
console.log(options);
console.log('');

var genstrings = new Genstrings();
genstrings.macro = options.genstringsMacro;
genstrings.language = options.genstringsLanguage;

var warningsArray = []; // [{message: '', info: {}}] For output at the end
var translationKeysArray = []; // Where all the translation keys from progress are kept, so we can output at the end
var startEndTimeOutputFormat = 'MMM Do YYYY H:mm:ss ZZ';
var progressTimeOutputFormat = 'H:mm:ss ZZ';


////// Warning and Progess Callbacks
genstrings.on("warning", function(message, info) {
  // Show the warning
  console.log('[' + moment().format(progressTimeOutputFormat) + '] WARNING :: ' + message + ' ::');
  console.log(info);
  console.log('');

  // Store it for output to a file at end
  warningsArray.push({message: message, info: info});
});
genstrings.on("progress", function(progress, file, translationKeys) {
  console.log('[' + moment().format(progressTimeOutputFormat) + '] progress :: ' + progress + ' :: ' + file + ' ::');
  translationKeysArray = translationKeysArray.concat(translationKeys); // Store for output at the end

  // If we have finished parsing the files, write files
  if (progress >= 1)  {
    console.log('');
    console.log('');

    console.log('Writing parse output file...');
    fs.writeFileSync(options.outputFilePath, JSON.stringify(translationKeysArray));
    console.log('Writing warnings output file...');
    fs.writeFileSync(options.warningsOutputFilePath, JSON.stringify(warningsArray));
    console.log('');

    // Output script is done!
    var endTime = moment();
    console.log(endTime.format(startEndTimeOutputFormat));
    console.log('Parse complete! Took ' + endTime.diff(startTime, 'minutes') + ' minutes!');
    console.log('Output written to ' + options.outputFilePath);
    console.log('Warnings written to ' + options.warningsOutputFilePath);
  }
});


////// Get all the paths to the files we need to parse
var filesToParse = [];
fs.recurseSync(options.folderPath, options.filePathFilter, function(filepath, relative, filename) {
  if (filename) {
    filesToParse.push(filepath);
  }
})

////// Do the parsing!!!!
console.log(''); // Add an empty line before we start parsing, for space
genstrings.parseFiles(filesToParse);
