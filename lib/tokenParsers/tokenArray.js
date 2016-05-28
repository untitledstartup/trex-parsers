(function(){
  
// Iterator
  function makeIterator(array){
      var nextIndex = 0;
    
      return {
         next: function(){
           if (nextIndex < array.length) {
             return array[nextIndex++];
           }
           else {
             return null;
           }
         },
         peek: function () {
           return array[nextIndex];
         },
         current: function () {
           return array[nextIndex-1];
         },
         done: function () {
           return nextIndex >= array.length;
         }
      }
  }
  
// TokenArray
  function TokenArray(array) {
    this.iterator = makeIterator(array);
    this.length = array.length;
  }
  TokenArray.prototype.iterator = null;
  TokenArray.prototype.length = 0;
  
  module.exports = TokenArray;
})()