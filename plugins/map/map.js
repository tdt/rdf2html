/**
* Map plugin
*
* Adds all geographic data it can find in the N3 db on a map using the leaflet API
* @author: Pieter Colpaert
* @author: Michiel Vancoillie
*/

var L = require('leaflet');
var wkx = require('wkx');
var Util = require('n3').Util;

// Main closure
module.exports = function (db, container, prefixes, config) {
	
	// Tell leaflet the location at which it can find its images
    L.Icon.Default.imagePath = config.assetsBase + '/images';

    // Create group for all elements
    var group = new L.featureGroup();

    // Call object functions
    addPoints(db, group);
    addWkt(db, group);

    // Check if there are objects to be rendered on the map
    var geoGroup = group.toGeoJSON();
    if(typeof geoGroup.features !== 'undefined' && geoGroup.features.length > 0){

        // Create map object with defaults
        var map = L.map(container[0], {
            center: [51, 3.70],
            zoom: 13
        });

        // Add a tile layer
        var mapURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> ';
        L.tileLayer(mapURL, {attribution: attribution}).addTo(map);

        // Add group to map
        group.addTo(map);

        // Fit map bounds
        map.fitBounds(group.getBounds(), {padding: [50, 50]});
    }
};

// TODO: Support more shapes.

// Add points on the group layer
var addPoints = function (db, group) {

    var triples = db.find(null, 'http://www.w3.org/2003/01/geo/wgs84_pos#long', null);

    triples.forEach(function (data) {
        var lat = db.find(data.subject, 'http://www.w3.org/2003/01/geo/wgs84_pos#lat', null)[0];
		if(lat) {
		    L.marker([getLiteralValue(lat.object), getLiteralValue(data.object)]).addTo(group)
		    .bindPopup('<a href="' + data.subject + '" target="_blank" >' + data.subject +'</a>');
		}
    });

};

// Add WKT strings on the group layer
var addWkt = function (db, group) {

    var triples = db.find(null, 'http://www.opengis.net/ont/geosparql#hasGeometry', null);

    triples.forEach(function (data) {
        var wktTriple = db.find(data.object, 'http://www.opengis.net/ont/geosparql#asWKT', null)[0];
        if(wktTriple) {
            var shape = wkx.Geometry.parse(Util.getLiteralValue(wktTriple.object));
            // TODO: Support more WKT types
            if(shape.exteriorRing) {
                var points = shape.exteriorRing.map(function (point) {
                    return [point.y, point.x];
                });
                L.polygon(points).addTo(group)
                    .bindPopup('<a href="' + data.subject + '" target="_blank" >' + data.subject + '</a>');
            }
        }
    });

};