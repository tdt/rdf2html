/**
* RDF2HTML
*
* Generates HTML representations for RDF turtles
*
* @author: Pieter Colpaert
* @author: Michiel Vancoillie
*/

// Register N3
var N3 = require('n3');
require('n3').Util(global);
var $ = require('jquery');

// Load utilities
require('./utilities.js');

// Definition of existing plugins
var plugins = {
    'triples': require('./plugins/triples/triples.js'),
    'ontology': require('./plugins/ontology/ontology.js'),
    'map': require('./plugins/map/map.js'),
    'paging' : require('./plugins/paging/paging.js')
}

// Defaults for configuration
var defaults = {
    // Default called plugins
    plugins: ['triples', 'ontology', 'map','paging'],
    // Log information to the console
    verbose: false
}

/**
 * Main closure
 * @param  {string} triples      RDF triples in turle format
 * @param  {object} config       Configuration object
 */
rdf2html = function (triples, config) {

    // Check configuration
    for(var item in defaults) {
        // Set defaults for undefined properties
        if (!config[item]) {
            config[item] = defaults[item];
        }
    }

    if(config["custom"]) {
        plugins["custom"] = config["custom"];
    }

    if (config.verbose) console.log('Configuration used', config);

    // Setup turtle parser
    var parser = N3.Parser();
    var db = N3.Store();
    parser.parse(triples, function (error, triple, prefixes) {

        // Always log errors
        if (error) {
            console.error(error);
        }

        // Parse triples
        if (triple) {
            db.addTriple(triple.subject, triple.predicate, triple.object);
        } else {
            // Triples are loaded
            if (config.verbose) console.info('Triples successfully loaded');
            if (config.verbose) console.log('Loaded triples', db);

            // Pass triples to plugins
            for(var plugin in config.plugins) {

                // Plugin identifier
                var identifier = config.plugins[plugin];

                // Check for map container
                var container = $("[data-rdftohtml-plugin='" + identifier + "']");
                if (container.length == 0) {
                    container = $('<div></div>');
                    if (config.verbose) console.warn("Couldn't find container for plugin:", identifier);
                }

                // Call plugin
                plugins[identifier](db, container, prefixes);
                if (config.verbose) console.info('Called plugin:', identifier);

                // Check if container has information, otherwise add hide class
                if (container.is(':empty')) {
                    container.addClass('hidden');
                }
            };
        }
    });
};

