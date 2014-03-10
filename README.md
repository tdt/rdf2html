rdf2html
========

a javascript library to visualize an array of RDF triples into an HTML page

## Usage 

### HTML skeleton ###

We use an HTML skeleton in which we inject the code:

```html
<div id="rdf2html">
  <div id="map"></div>
  <div id="ontology">
    <div id="maintainers"></div>
    <div id="classes"></div>
  </div>
  <div id="metadata"></div>
  <div id="triples"></div>
</div>
```

You can customize this HTML to fit your page's lay-out. Be sure to add script tags for the rdf2html and run it.

### A visualizer for your vocabulary ###

Some guidelines:

You're creating a particular visualization: e.g., you want to display an ontology, you want to display something on a map, you want to show some meta-data, etc. If there is already a visualization for what you want to do, e.g., a map or an ontology visualizer, integrate it in the specific code. If you want to do something completely new, then go ahead and add your own javascript class.

## Contribute

Clone this repository, run `bower install`, and you're all set.

## Support

Currently, we support these ontologies:

 * _none_

We want you to contribute, or we are planning to contribute these in the future:

 * geo
 * owl/rdfs
 * apps4eu
 * foaf
 * dcterms
 * dbpedia-owl
 * dcat
 * data cube (e.g., for graphs)
 * oslo: http://purl.org/oslo#
 * opening hours: http://semweb.mmlab.be/oh#
 * schema: http://schema.org/

## Authors ##

Ghent University - MMLab - iMinds: Miel Vander Sande, Pieter Colpaert
We Open Data: Michiel Vancoillie

© 2014 - Ghent University - MIT License