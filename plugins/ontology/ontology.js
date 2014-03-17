/**
 * This file adds all ontology data it can find in the N3 db to the ontology id html tag using bootstrap classes
 * @author: Pieter Colpaert
 */

var $ = require("jquery");

var addClasses = function (db){

  //todo: only append if there are triples to show
  $("#ontology").append("<h3>Classes</h3><div id=\"classes\"></div>");

  var triples = db.find(null,"http://www.w3.org/2000/01/rdf-schema#subClassOf",null);
  triples.forEach(function(data) {

    $("#classes").append("<h4>" + data["subject"] + "</h4>");
    $("#classes").append("<p><label>SubClassOf: </label>" + data["object"] + "</p>");
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
module.exports =  function(db) {
  if($("#ontology")){
    
    addClasses(db);
    addProperties(db);
    addMisc(db);
  }
};