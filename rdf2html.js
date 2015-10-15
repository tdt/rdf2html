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

// Defaults for configuration
var defaults = {
    // Default called plugins
    plugins: {
        triples: {
            callback: require('./plugins/triples/triples.js')
        },
        ontology: {
            callback: require('./plugins/ontology/ontology.js')
        },
        map: {
            callback: require('./plugins/map/map.js'),
            // Base path on which the assets are provided
            assetsBase: '/dist'
        },
        paging: {
            callback: require('./plugins/paging/paging.js'),
            firstPage :   '&laquo;',
            previousPage: 'Previous',
            nextPage:     'Next',
            lastPage:     '&raquo;'
        }
    }
};

loadDefaults = function (defaults, config) {
    for(var item in defaults) {
        // Set defaults for undefined properties
        if (!config[item]) {
            config[item] = defaults[item];
        }
    }
    return config;
};

/**
 * Main closure
 * @param  {string} triples      RDF triples in turle format
 * @param  {object} config       Configuration object
 */
rdf2html = function (triples, config) {

    // Transform plugin array to map if the simplified config is use
    config.plugins = Array.isArray(config.plugins) ? config.plugins.reduce(function (plugins, plugin) { plugins[plugin] = true; return plugins; }, {}) : config.plugins;
    // Load default configuration
    config = loadDefaults(defaults, config);
    // Set default properties for enabled plugins
    for(var plugin in config.plugins) {
        if(config.plugins[plugin] === true) {
            config.plugins[plugin] = defaults.plugins[plugin];
        } else {
            config.plugins[plugin] = loadDefaults(defaults.plugins[plugin], config.plugins[plugin]);
        }
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

                // Check for map container
                var container = $("[data-rdftohtml-plugin='" + plugin + "']");
                if (container.length == 0) {
                    container = $('<div></div>');
                    if (config.verbose) console.warn("Couldn't find container for plugin:", plugin);
                }

                // Call plugin
                var pluginConfig = config.plugins[plugin];
                pluginConfig.callback(db, container, prefixes, pluginConfig);
                if (config.verbose) console.info('Called plugin:', plugin);

                // Check if container has information, otherwise add hide class
                if (container.is(':empty')) {
                    container.addClass('hidden');
                }
            };
        }
    });
};

