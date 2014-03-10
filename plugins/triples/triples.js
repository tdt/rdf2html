define(function () {
  return function(db) {
    if($("#triples")){
      var stream = db.getStream({});
      stream.on("data", function(data) {
        //todo: first, get all the entities, then visualize entities separately
        //todo: add links to other visualization tools
        $("#triples").append('<div class="triple"><div class="subject">' + data.subject + '</div><div class="predicate">' + data.predicate + '</div><div class="object">' + data.object + '</div></div>');
      });
    }
  };
});