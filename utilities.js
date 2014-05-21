/**
 * Global utility functions
 */

// Function to turn links in to link
global.linkify = function(text, prefixes) {
    if (text) {
        text = text.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
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
