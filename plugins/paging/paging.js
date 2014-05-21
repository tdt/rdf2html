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
    addPaging(db, container);
};

var addPaging = function (db, container) {

    // Match the current URI. It's this URI you want to find next or previous pages of
    var currentURI = document.location.href.match(/(^[^#]*)/);

    var firstPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#firstPage", null);
    var previousPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#previousPage", null);
    var nextPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#nextPage", null);
    var lastPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#lastPage", null);

    var pagination = $('<ul class="pagination"></ul>');


    if (firstPage.length > 0) {
        pagination.append('<li><a href="' + firstPage + '">&laquo;</a></li>');
    }

    if (previousPage.length > 0) {
        pagination.append('<li><a href="' + previousPage + '">Previous</a></li>');
    }

    if (nextPage.length > 0) {
        pagination.append('<li><a href="' + nextPage + '">Next</a></li>');
    }

    if (lastPage.length > 0) {
        pagination.append('<li><a href="' + lastPage + '">&raquo;</a></li>');
    }

    // Check if pagination isn't empty
    if (!pagination.is(':empty')) {
        container.append(pagination);
    }
};