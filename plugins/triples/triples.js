/**
 * Triples plugin
 *
 * @author: Pieter Colpaert
 * @author: Michiel Vancoillie
 */

module.exports =  function (db, container, prefixes) {
  var triples = db.find(null, null, null);
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
    // Set max level here
    if (!level) {
      level = 0;
    }
    if (level < 4) {
      db.find(resource,null,null).forEach(function (data) {
        var prefix = "";
        if (isBlank(resource)) {
          for (var i = 0; i < level ; i++) {
            prefix += "&raquo; ";
          }
        }
        if (isBlank(data.object)){
          // container.append('<p><span class="predicate">'+ prefix +  linkify(data.predicate, prefixes) +'</span><span class="object"></span></p>');
          // resource2Html(data.object, triples, level+1);
        } else if (isUri(data.object) ) { 
          container.append('<p><span class="predicate">'+ prefix +  linkify(data.predicate, prefixes) +'</span><span class="object">'+ linkify(data.object, prefixes) +'</span></p>');
        } else if (isLiteral(data.object)){
          container.append('<p><span class="predicate">'+ prefix + linkify(data.predicate, prefixes) +'</span><span class="object">'+ getLiteralValue(data.object) + '</span></p>');
        }
      });
    }
  };

  var resources = getResources(triples);
  
  resources.forEach(function (resource) {
    // TODO: first, get all the entities, then visualize entities separately
    container.append('<div class="rdf2html-triple"><h2 class="subject">' + linkify(resource, prefixes) + '</h2>');

    resource2Html(resource, triples);
    container.append('</div>');

  });
};

function linkify(text, prefixes) {
  if (text) {
    text = text.replace(
        /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
      function (url) {
        var full_url = url;

        if (!full_url.match('^https?:\/\/')) {
          full_url = 'http://' + full_url;
        }

        for ( var prefix in prefixes) {
          url = url.replace(prefixes[prefix], prefix + ":");
        }

        return '<a href="' + full_url + '">' + url + '</a>';
      }
    );
  }
  return text;
}