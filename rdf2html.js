// plugins should be put in the plugins directory under: "plugins/{name}/{name}.js"
var N3 = require('n3');
var plugins = [ 
  require("./plugins/triples/triples.js"), 
  require("./plugins/map/map.js"),
  require("./plugins/ontology/ontology.js")
];
require('n3').Util(global);

rdf2html = function(turtle){
  var parser = N3.Parser();
  var db = N3.Store();
  var prefixes = [];
  parser.parse(turtle, function (error, triple, prefixes ) {
    if (triple) {
      db.addTriple(triple.subject,triple.predicate,triple.object);
    }
    else {
      console.log("Triples successfully loaded");
      plugins.forEach(function(pl){
        pl(db);
      });
    }
  });
};