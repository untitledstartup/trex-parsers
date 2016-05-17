(function(){
  var GitHubAPI = require('github');
  var github = new GitHubAPI({version: "3.0.0"});
  var Path = require('path');
  var FS = require('fs');
  var Logger = require(__dirname + '/logger.js').sharedLogger;
  
  function getGitHubAuthorization(token) {
    github.authenticate({
      type: "oauth", 
      token: token
    });
    global['githubToken'] = token;
  }
  
  function queryGithub(method, queryObject, callback) {
    github.search[method](queryObject, callback);
  }
  
  function queryRepos(query, lang, callback) {
    var q = query + " in:file";
    if (lang) {
      q += " language:" + lang;
    }
    
    fetchQueue.push(function(cb) {
      queryGithub("repos", {"q": q}, function(error, result) {
        var repos = null;
        if (error) {
          Logger.error("Error querying repos: " + error);
        }
        else if (result) {
          repos = result.items;
        }
        if (typeof callback == 'function') {
          callback(repos);
        }
        cb();
      });
    });
  }
  
  function queryFilesInRepo(query, lang, repo, callback) {
    var q = query + " in:file";
    if (lang) {
      q += " language:" + lang;
    }
    if (repo) {
      q += " repo:" + repo;
    }
    
    fetchQueue.push(function(cb) {
      queryGithub("code", {"q": q}, function(error, result) {
        var files = null;
        if (error) {
          Logger.error("Error querying files in repo: " + error);
        }
        else if (result) {
          files = result.items;
        }
        if (typeof callback == 'function') {
          callback(files);
        }
        cb();
      });
    });
  }
  
  function fetchFilesFromGitHub(user, repo, path, callback) {
    var q = {
      user: user,
      repo: repo,
      path: path
    };
    fetchQueue.push(function(cb) {
      github.repos.getContent(q, function(error, result) {
        debugger;
        if (error) {
          Logger.error("Error fetching content from GitHub: " + error);
        }
        if (typeof callback == 'function') {
          callback(result);
        }
        cb();
      });
    });
  }
  
  function fetchObjcSamples(sampleSize, destination, callback) {
    var q = "NSLocalizedString";
    var l = "Objective-C";
    queryRepos(q, l, function(repos) {
      var repoNames = (repos) ? repos.map(function(i) {return i.full_name;}) : [];
      var remainder = repoNames.length;
      
      function finalize() {
        remainder--;
        if (remainder <= 0 && typeof callback == 'function') {
          callback();
        }
      }
      
      for (var i=0; i<repoNames.length; i++) {
        var repoName = repoNames[i];
        queryFilesInRepo(q, l, repoName, function(result) {
          if (!result || result.length === 0) {
            finalize();
            return;
          }
          var files = result;
          for (var j=0; j<files.length; j++) {
            var file = files[j];
            var repo = file.repository;
            var user = repo.full_name.split("/");
            repo = user[1];
            user = user[0];
            remainder++;
            Logger.info("Fetching: " + user + "/" + repo + "/" + file.path);
            fetchFilesFromGitHub(user, repo, file.path, function(content) {
              debugger;
              if (content) {
                var fName = content.name;
                var fContent = new Buffer(content.content, content.encoding);
                var outPath = Path.join(destination, fName);
                debugger;
                FS.writeFileSync(outPath, fContent);
              }
              finalize();
            });
          }
        });
      }
    });
    if (!fetchQueue.running) {
      fetchQueue.start();
    }
  }
  
  var Queue = require('queue');
  var fetchQueue = Queue();
  
  var TestUtils = {
    "queryGithub": queryGithub,
    "fetchSamplesForLanguage": function fetchSamplesForLanguage(lang, sampleSize, destination, callback) {
      if (global['githubToken']) {
        getGitHubAuthorization(global['githubToken']);
      }
      switch(lang) {
      case "objc":
        fetchObjcSamples(sampleSize, destination, callback);
        break;
      }
    }
  };
  
  module.exports = TestUtils;
})()
