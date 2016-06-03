(function(){
  
// Iterator
  
  function makeIterator(array){
      var index = -1;
    
      return {
         next: function(){
           while (index < array.length - 1) {
             var item = array[++index];
             if (!item) {
               continue;
             }
             return item;
           }
           return null;
         },
         previous: function() {
           while (index > 0) {
             var item = array[--index];
             if (!item) {
               continue;
             }
             return item;
           }
           return null;
         },
         peek: function() {
           var i = index;
           while (i < array.length - 1) {
             var item = array[++i];
             if (!item) {
               continue;
             }
             return item;
           }
           return null;
         },
         peekPrevious: function() {
           var i = index;
           while (i > 0) {
             var item = array[--i];
             if (!item) {
               continue;
             }
             return item;
           }
           return null;
         },
         current: function () {
           return array[index];
         },
         atEnd: function () {
           return index >= array.length - 1;
         },
         atStart: function () {
           return index <= 0;
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