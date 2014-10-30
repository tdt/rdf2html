/**
* Triples plugin
*
* @author: Pieter Colpaert
* @author: Michiel Vancoillie
*/

var $ = require('jquery');

module.exports =  function (db, container, prefixes) {

	function compareTriples(triple1, triple2) {
		return triple1.subject === triple2.subject;
	}
	
	function containsTriple(triple, store) {
		index = 0;
		
		while (index < store.length && !compareTriples(triple, store[index])) {
			index ++;
		}
		
		return index < store.length;
	}

    // Get all triples
    var allTriples = db.find(null, null, null);
	var allClasses = db.find(null, null, "http://www.w3.org/2002/07/owl#Class");
    var allOntologies = db.find(null, null, "http://www.w3.org/2002/07/owl#Ontology");
	var allProperties = db.find(null, null, "http://www.w3.org/2002/07/owl#DatatypeProperty");
	
	var triples =  allTriples.filter(function(item) {
		return !containsTriple(item, allClasses) && !containsTriple(item, allProperties) && !containsTriple(item, allOntologies);
	});
    
    // Add 2 column table row
    var createTableRow = function (col1, col2) {
        var row = $('<tr></tr>');
        row.append('<td>' + col1 + '</td>');
        row.append('<td>' + col2 + '</td>');
        return row;
    }

    // Get all resources
    var getResources = function (triples) {
        var resources = [];

        triples.forEach(function (data) {
            if (!isBlank(data.subject) && resources.indexOf(data.subject) < 0 ) {
                resources.push(data.subject);
            }
        });
        return resources;
    };

    var resource2Html = function (resource, triples, level) {
        var rows = [];

        // Set max level here
        if (!level) {
            level = 0;
        }
        if (level < 4) {

            // Get all triples for resource
            db.find(resource, null, null).forEach(function (data) {

                // Add prefix to blank nodes to display level
                var prefix = "";
                if (isBlank(resource)) {
                    for (var i = 0; i < level ; i++) {
                        prefix += "&raquo; ";
                    }
                }

                var predicate = prefix +  linkify(data.predicate, prefixes);
                var object = "";

                // Check for blank nodes / URI's / Literals
                if (isBlank(data.object)){
                    // container.append('<p><span class="predicate">'+ prefix +  linkify(data.predicate, prefixes) +'</span><span class="object"></span></p>');
                    // resource2Html(data.object, triples, level+1);
                } else if (isUri(data.object) ) {
                    object = linkify(data.object, prefixes);
                } else if (isLiteral(data.object)){
                    object = getLiteralValue(data.object);
                }

                // Add row
                rows.push(createTableRow("<a href='" + data.predicate + "'>" + searchForLabel(data.predicate, db) + "</a>", object));
            });
        }

        return rows;
    };

    // Get resources
    var resources = getResources(triples);

    // Display resources
    resources.forEach(function (resource) {
        // TODO: first, get all the entities, then visualize entities separately
        var subjectContainer = $('<div class="rdf2html-triple"><h4 class="subject">' + linkify(resource, prefixes) + '</h4></div>')

        // Add triples table
        var table = $('<table class="triples table table-hover"></table>');
        table.append(resource2Html(resource, triples));
        subjectContainer.append(table);

        // Add subject with its triples
        container.append(subjectContainer);
    });
};
