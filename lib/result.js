(function(){
  function Result(ctor, results, subResults) {
    this.ctorName = ctor;
    if (results) {      
      this.results = (results instanceof Array) ? results : [results];
    }
    if (subResults) {
      this.subResults = (subResults instanceof Array) ? subResults : [subResults];
    }
  }
  Result.prototype.ctorName = null;
  Result.prototype.results = null;
  Result.prototype.subResults = null;
  Result.prototype.node = null;
  Result.prototype.flatten = function flatten() {
    var all = [];
    var newResults = [];
    if (this.results) {
      all = all.concat(this.results);
    }
    
    if (this.subResults) {
      all = all.concat(this.subResults);
    }
    
    for (var i=0; i<all.length; i++) {
      var r = all[i];
      if (r instanceof Result) {
        r = r.flatten();
      }
      if (r instanceof Array) {
        newResults = newResults.concat(r);
      }
      else {
        newResults.push(r);
      }
    }
    this.results = newResults;
    this.subResults = null;
  };
  Result.prototype.clone = function() {
    var newResult = new Result(this.ctorName, this.results, this.subResults);
    return newResult;
  };
  
  module.exports = Result;
})()