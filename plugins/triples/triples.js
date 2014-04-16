/**
 * Triples plugin
 *
 * @author: Pieter Colpaert
 * @author: Michiel Vancoillie
 */

module.exports =  function (db, container) {
    var triples = db.find(null, null, null);
    triples.forEach(function (data) {
        // TODO: first, get all the entities, then visualize entities separately
        container.append('<div class="rdf2html-triple"><div class="subject">' + linkify(data.subject) + '</div><div class="predicate">' + linkify(data.predicate) + '</div><div class="object">' + linkify(data.object) + '</div></div>');
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