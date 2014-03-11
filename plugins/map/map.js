define(function () {

  /**To be replaced with N3Utils when it becomes bower compatible**/
  var getLiteralValue = function (literal) {
    var match = /^"((?:.|\n|\r)*)"/.exec(literal);
    if (!match)
      throw new Error(literal + ' is not a literal');
    return match[1];
  };

  /**
   * This will add the points on the map
   */
  var addPoints = function (db, map) {

    var stream = db.searchStream([{
      subject: db.v("entity1"),
      predicate: 'http://www.w3.org/2003/01/geo/wgs84_pos#long',
      object: db.v("long")
    },{
      subject: db.v("entity1"),
      predicate: 'http://www.w3.org/2003/01/geo/wgs84_pos#lat',
      object: db.v("lat")
    }]);

    stream.on("data", function(data) {
      L.marker([getLiteralValue(data["lat"]), getLiteralValue( data["long"] ) ]).addTo(map)
        .bindPopup('<a href="' + data["entity1"] + '" target="_blank" >' + data["entity1"] +'</a>');
    });
  };

  // TODO: Support more shapes.


  // Main closure
  return function(db) {
    if($("#map")){
      var map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      addPoints(db, map);
      
    }
  };
});