(function(){
  
  var GitHubAPI = require('github');
  var FS = require('fs');
  var Logger = require(__dirname + '/logger.js').sharedLogger;
  var GSUtils = require(__dirname + '/utils.js');
  var Queue = require('queue');
  var inherits = require('inherits');
  var EventEmitter = require('events').EventEmitter;
  
  var github = new GitHubAPI({version: "3.0.0"});
  
  function GitHubGopher(accessToken) {
    this.accessToken = accessToken;
    if (accessToken) {
      github.authenticate({
        type: "oauth", 
        token: accessToken
      });
    }
    this.queue = Queue();
  }
  
  inherits(GitHubGopher, EventEmitter);
  
  GitHubGopher.prototype.accessToken = null;
  GitHubGopher.prototype.queue = null;
  GitHubGopher.prototype.page = 0;
  GitHubGopher.prototype.perPage = 0;
  GitHubGopher.prototype.query = null;
  GitHubGopher.prototype.sort = null;
  GitHubGopher.prototype.descending = false;
  
  GitHubGopher.prototype.repos = null;
  GitHubGopher.prototype.files = null;
  
  GitHubGopher.prototype.reset = function reset() {
    this.query = null;
    this.page = 0;
    this.perPage = 10;
    this.sort = null;
    this.descending = false;
    this.repos = [];
    this.files = [];
    if (this.queue.running) {
      this.queue.end();
    }
  };
  GitHubGopher.prototype.fetchContentMatchingQuery = function fetchContentMatchingQuery(query, page, perPage, sort, descending) {
    this.reset();
    this.query = query;
    this.page = (page) ? page : 0;
    this.perPage = (perPage) ? perPage : 100;
    this.sort = (sort) ? sort : null;
    this.descending = !!descending;
    this._queryRepos();
  };
  GitHubGopher.prototype.stop = function() {
    this.queue.stop();
  };
  
  // Query Construction
  Object.defineProperty(GitHubGopher.prototype, "apiQueryObject", {
    "get": function() {
      var q = {};
      if (this.query) {
        q['q'] = this.query;
      }
      if (this.page) {
        q['page'] = this.page;
      }
      if (this.perPage) {
        q['per_page'] = this.perPage;
      }
      if (this.sort) {
        q['sort'] = this.sort;
      }
      q['order'] = (this.descending) ? "desc" : "asc";
      return q;
    }
  });
  
  GitHubGopher.prototype.onError = function onError(error) {
    Logger.error("GitHubGopher Error: " + error);
  };
  GitHubGopher.prototype.onSearchRepos = function onRepos(result) {
    var items = (result) ? result.items : null;
    if (!items || !(items instanceof Array) || items.length === 0) {
      return;
    }
    this.repos = this.repos.concat(items);
    for (var i=0; i<items.length; i++) {
      var repo = items[i];
      var repoName = (repo) ? repo["full_name"] : null;
      if (repoName) {
        this._queryCodeInRepo(repoName);
      }
    }
  };
  GitHubGopher.prototype.onSearchCode = function onCode(result) {
    var items = (result) ? result.items : null;
    if (!items || !(items instanceof Array) || items.length === 0) {
      return;
    }
    this.files = this.files.concat(items);
    for (var i=0; i<items.length; i++) {
      var file = items[i];
      var repo = file.repository;
      var user = repo.full_name.split("/");
      repo = user[1];
      user = user[0];
      var path = file.path;
      this._fetchContents(user, repo, path);
    }
  };
  
  GitHubGopher.prototype._performGitHubRequest = function(apiPath, msg) {
    var self = this;
    var apiPathParts = apiPath.split(".");
    var api = github;
    var handlerName = "on";
    for (var i=0; i<apiPathParts.length; i++) {
      var part = apiPathParts[i];
      api = api[part];
      handlerName += part.substring(0,1).toUpperCase() + part.substring(1);
    }
    this.queue.push(function(cb) {
      api(msg, function(error, result) {
        if (error) {
          debugger;
          self.onError(error);
          self.emit("error", error);
        }
        else {
          var handler = self[handlerName];
          if (typeof handler == 'function') {
            handler.apply(self, [result]);
          }
          self.emit(apiPath, result);
        }
        cb();
      });
    });
    if (!this.queue.running) {
      this.queue.start();
    }
  };
  
  GitHubGopher.prototype._queryRepos = function _queryRepos() {
    this._performGitHubRequest("search.repos", this.apiQueryObject);
  };
  GitHubGopher.prototype._queryCodeInRepo = function _queryFilesInRepo(repoName) {
    var query = this.apiQueryObject;
    var q = query.q;
    if (!q) {
      q = "";
    }
    q += " repo:" + repoName;
    query.q = q;
    this._performGitHubRequest("search.code", query);
  };
  GitHubGopher.prototype._fetchContents = function _fetchContents(user, repo, path) {
    var q = {
      user: user,
      repo: repo,
      path: path
    };
    this._performGitHubRequest("repos.getContent", q);
  };
  
  module.exports = GitHubGopher;
  
})()