/**
 * Triples plugin
 *
 * @author: Pieter Colpaert
 * @author: Michiel Vancoillie
 */

module.exports =  function (db, container) {
  var triples = db.find(null, null, null);
  var getResources = function (triples) {
    var resources = [];

    triples.forEach(function (data) {
      if (data.subject.substr(0,1) != "_" && resources.indexOf(data.subject) < 0 ) {
        resources.push(data.subject);
      }
    });
    return resources;
  };

  var resources = getResources(triples);
  

  resources.forEach(function (resource) {
    console.log(resource);
    // TODO: first, get all the entities, then visualize entities separately
    container.append('<div class="rdf2html-triple"><h2 class="subject">' + linkify(resource) + '</h2>');
    db.find(resource,null,null).forEach(function (data) {
      
      container.append('<p><span class="predicate">'+ linkify(data.predicate) +'</span><span class="object">'+ data.object+'</span></p>');
    });
    container.append('</div>');

  });
};

function linkify(text) {
  if (text) {
    text = text.replace(
        /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
      function (url) {
        var full_url = url;
        if (!full_url.match('^https?:\/\/')) {
          full_url = 'http://' + full_url;
        }
        return '<a href="' + full_url + '">' + url + '</a>';
      }
    );
  }
  return text;
}