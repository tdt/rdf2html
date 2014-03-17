/**
 * This file adds all geographic data it can find in the N3 db on a map using the leaflet API
 * @author: Pieter Colpaert
 */

var $ = require("jquery");

/**
 * This will add the points on the map
 */
var addPoints = function (db, map) {
  var triples = db.find(null,"http://www.w3.org/2003/01/geo/wgs84_pos#long",null);
  triples.forEach(function(data) {
    var lat = db.find(data.subject,"http://www.w3.org/2003/01/geo/wgs84_pos#lat",null)[0];
    L.marker([getLiteralValue(lat.object),getLiteralValue(data.object)]).addTo(map)
      .bindPopup('<a href="' + data.subject + '" target="_blank" >' + data.subject +'</a>');
  });
};

// TODO: Support more shapes.

// Main closure
module.exports = function (db) {
  if($("#map")){
    var map = L.map('map', {
      center: [51, 3.70],
      zoom: 13
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    addPoints(db, map);
  }
};