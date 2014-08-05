rdf2html
========

a javascript library to visualize an array of RDF triples into an HTML page

Current stage: `planning - alpha version`

## Usage

### HTML skeleton ###

We use a HTML data attribute `data-rdftohtml-plugin` to determine where to inject HTML generated from the plugins, for example for the map plugin:

```html
<div data-rdftohtml-plugin='map'></div>
```

Somewhere in the HTML code, you should include the triples in turtle format:

```html
<script id="turtle" type="text/turtle">
    @base <http://semweb.mmlab.be/ns/oh#> .
    @prefix owl: <http://www.w3.org/2002/07/owl#> .
    <http://semweb.mmlab.be/ns/oh> a owl:Ontology;
</script>
```

You can customize this HTML to fit your page's lay-out. Be sure to add script tags for the rdf2html and run it.

### A visualizer for your vocabulary ###

Some guidelines:

You're creating a particular visualization: e.g., you want to display an ontology, you want to display something on a map, you want to show some meta-data, etc. If there is already a visualization for what you want to do, e.g., a map or an ontology visualizer, integrate it in the specific code. If you want to do something completely new, then go ahead and add your own javascript class.

## Requirements

 * [Node.js](http://nodejs.org/)
 * [n3](https://www.npmjs.org/package/n3)
 * [jquery](https://www.npmjs.org/package/jquery)
 * [uglifyjs](https://www.npmjs.org/package/uglifyjs): to install run `sudo npm install -g uglify-js`
 * [Browserify](http://browserify.org/): to install run `sudo npm install -g browserify`

 Or us

## Contribute

Clone this repository, run `browserify rdf2html.js | uglifyjs > build/rdf2html.js`, use the build javascript file.

## Support

Currently, we support these ontologies:

 * geo
 * owl/rdfs

We want you to contribute, or we are planning to contribute these in the future:

 * apps4eu
 * foaf
 * dcterms
 * dbpedia-owl
 * dcat
 * data cube
 * oslo: http://purl.org/oslo#
 * opening hours: http://semweb.mmlab.be/oh#
 * schema: http://schema.org/

## Authors ##

Ghent University - MMLab - iMinds: Miel Vander Sande, Pieter Colpaert

We Open Data: Michiel Vancoillie


© 2014 - Ghent University - MIT License
