/**
* Ontology plugin
*
* Adds all ontology data it can find in the N3 db
* @author: Pieter Colpaert
* @author: Michiel Vancoillie
*/

var $ = require('jquery');

// Main closure
module.exports =  function(db, container, prefixes) {
    addClasses(db, container);
    addProperties(db, container);
    addMisc(db, container);
};

var addClasses = function (db, container) {

    var triples = db.find(null, "http://www.w3.org/2000/01/rdf-schema#subClassOf", null);

    if (triples.length > 0) {
        container.append('<h4>Classes</h4><div id="rdf2html-classes"></div>');

        triples.forEach(function (data) {
            $("#rdf2html-classes").append("<h5>" + linkify(data["subject"]) + "</h5>");
            $("#rdf2html-classes").append("<p><label>SubClassOf:</label> " + linkify(data["object"]) + "</p>");
        });
    }

};

var addProperties = function (db, container) {
    // TODO
};

var addMisc = function (db, container) {
    // TODO
};
