var $ = require("jquery");
module.exports =  function (db) {
  if($("#triples")){
    var triples = db.find(null,null,null);
    triples.forEach(function (data) {
      //todo: first, get all the entities, then visualize entities separately
      //todo: add links to other visualization tools
      $("#triples").append('<div class="triple"><div class="subject">' + data.subject + '</div><div class="predicate">' + data.predicate + '</div><div class="object">' + data.object + '</div></div>');
    });
  }
};