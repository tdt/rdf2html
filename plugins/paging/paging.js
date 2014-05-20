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
  addPaging(db, container);
};

var addPaging = function (db, container) {

  //match the current URI. It's this URI you want to find next or previous pages of
  var currentURI = document.location.href.match(/(^[^#]*)/);

  var firstPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#firstPage", null);
  var previousPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#previousPage", null);
  var nextPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#nextPage", null);
  var lastPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#lastPage", null);

  if (firstPage) {
    container.append('<li id="firstPage"><a href="' + firstPage + '">first page</a></li>');
  }

  if (previousPage) {
    container.append('<li id="firstPage"><a href="' + previousPage + '">previous page</a></li>');
  }

  if (nextPage) {
    container.append('<li id="nextPage"><a href="' + nextPage + '">next page</a></li>');
  }

  if (lastPage) {
    container.append('<li id="lastPage"><a href="' + lastPage + '">last page</a></li>');
  }
  
};