define(function () {

  /**To be replaced with N3Utils when it becomes bower compatible**/
  var getLiteralValue = function (literal) {
    var match = /^"((?:.|\n|\r)*)"/.exec(literal);
    if (!match)
      throw new Error(literal + ' is not a literal');
    return match[1];
  };

  var addClasses = function (db){
    var rdfsStream = db.searchStream([{
      subject: db.v("entity"),
      predicate: 'http://www.w3.org/2000/01/rdf-schema#subClassOf',
      object: db.v("parent")
    }]);
    //todo: only append if there are triples to show
    $("#ontology").append("<h3>Classes</h3><div id=\"classes\"></div>");
    rdfsStream.on("data", function(data) {
      $("#classes").append("<h4>" + data["entity"] + "</h4>");
      $("#classes").append("<p><label>SubClassOf: </label>" + data["parent"] + "</p>");
    });
  };

  var addProperties = function (db){
    //todo: only append if there are triples to show
    $("#ontology").append("<h3>Properties</h3>");
  };

  var addMisc = function (db) {
    //todo: only append if there are triples to show
    $("#ontology").append("<h3>Misc</h3>");
  };

  // Main closure
  return function(db) {
    if($("#ontology")){
      
      addClasses(db);
      addProperties(db);
      addMisc(db);
    }
  };
});