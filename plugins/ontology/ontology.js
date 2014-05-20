/**
* Ontology plugin
*
* Adds all ontology data it can find in the N3 db
* @author: Pieter Colpaert
* @author: Michiel Vancoillie
*/

var $ = require('jquery');

// Main closure
module.exports =  function(db, container) {
    addClasses(db, container);
    addProperties(db, container);
    addMisc(db, container);
};

var addClasses = function (db, container) {

    var triples = db.find(null, "http://www.w3.org/2000/01/rdf-schema#subClassOf", null);

    if (triples) {
        container.append('<h4>Classes</h4><div id="rdf2html-classes"></div>');

        triples.forEach(function (data) {
            $("#rdf2html-classes").append("<h5>" + data["subject"] + "</h5>");
            $("#rdf2html-classes").append("<p><label>SubClassOf:</label> " + data["object"] + "</p>");
        });
    }

};

var addProperties = function (db, container) {
    // TODO: only append if there are triples to show
    container.append("<h4>Properties</h4>");
};

var addMisc = function (db, container) {
    // TODO: only append if there are triples to show
    container.append("<h4>Misc</h4>");
};
