/**
* Ontology plugin
*
* Adds all ontology data it can find in the N3 db
* @author: Pieter Colpaert
* @author: Michiel Vancoillie
*/

var $ = require('jquery');
                     
//create table based on http://www.w3.org/TR/2004/REC-owl-semantics-20040210/#indexs
var propertyProperties = [["Domain", rdfsPrefix + "domain"], ["Range", rdfsPrefix + "range"], ["Inverse of", owlPrefix + "inverseOf"]];

var ontologyProperties = [["Backward compatible with", owlPrefix + "backwardCompatibleWith"], ["Imports", owlPrefix + "imports"], ["Incompatible with", owlPrefix + "incompatibleWith"], ["Prior version", owlPrefix + "priorVersion"], ["Version IRI", owlPrefix + "versionIRI"], ["Version info", owlPrefix + "versionInfo"]];

var classesProperties = [["Complement of", owlPrefix + "complementOf"], ["Disjoint union of",owlPrefix + "disjointUnionOf"], ["Disjoint with", owlPrefix + "disjointWith"], ["Has key", owlPrefix + "hasKey"]];

// Main closure
module.exports =  function(db, container, prefixes) {
    addOntologies(db, container);
    addClasses(db, container);
    addProperties(db, container);
    addMisc(db, container);
};

// Add 2 column table row
function createTableRow(col1, col2) {
    var row = $('<tr></tr>');
    row.append('<td>' + col1 + '</td>');
    row.append('<td>' + col2 + '</td>');
    return row;
}


function addEntity(db, container, entity, owlEntity, properties) {
    var triples = db.find(null, null, owlEntity);
    var rdf2htmlID = "rdf2html-" + entity.toLowerCase();
    
    if (triples.length > 0) {
		container.append('<div class="panel-group" id="accordion' + entity + '"><div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title" data-toggle="collapse" data-parent="#accordion' + entity + '" href="#collapse' + entity + '"><span class="glyphicon glyphicon-chevron-up"></span> ' + entity + '</h4></div><div id="collapse' + entity + '" class="panel-collapse collapse in"><div class="panel-body" id="' + rdf2htmlID + '"></div></div>');

        triples.forEach(function (data) {
            $("#" + rdf2htmlID).append("<h4 class='subject' id='" + removePrefix(data["subject"], knownPrefixes) + "'><a href='" + data["subject"] + "'>" + searchForLabel(data["subject"], db) + "</a></h4>");
            
            rows = createPropertyRows(data, db, properties);
			
			if (rows.length > 0) {
				var table = $('<table class="triples table table-hover"></table>');
				table.append(rows);
				$("#" + rdf2htmlID).append(table);
			}
        });
    }
}

var addClasses = function (db, container) {
    addEntity(db, container, "Classes", "http://www.w3.org/2002/07/owl#Class", classesProperties);
}

var addProperties = function (db, container) {
    addEntity(db, container, "Properties", "http://www.w3.org/2002/07/owl#DatatypeProperty", propertyProperties);
}


var addOntologies = function (db, container) {
    addEntity(db, container, "Ontology", owlPrefix + "Ontology", ontologyProperties);   
}

//creates the different rows for the properties of the Property elements of the ontology.
function createPropertyRows(data, db, properties) {
	var rows = [];
	
	for (var index = 0; index < properties.length; index++) {
		var property = properties[index];
		var results = db.find(data["subject"], property[1], null);
			
		if (results.length > 0) {
			results.forEach(function (result) {
                if(isLiteral(result.object)) {
                    rows.push(createTableRow("<a href='" + property[1] + "'>" + property[0] + "</a>", getLiteralValue(result.object)));
                } else {
				rows.push(createTableRow("<a href='" + property[1] + "'>" + property[0] + "</a>", "<a href='#" + removePrefix(result["object"], knownPrefixes) + "'>" + searchForLabel(result["object"], db) + "</a>"));
                }
			});
		}
	}
	
	return rows;
}


var addMisc = function (db, container) {
    // TODO
};
