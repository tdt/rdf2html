define(function () {
  return function(db) {
    if($("#map")){
      var map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      var stream = db.getStream({object : "http://www.w3.org/2003/01/geo/wgs84_pos#Point"});
      stream.on("data", function(data) {
        L.marker([51.5, -0.09]).addTo(map)
          .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
          .openPopup();

      });
    }
  };
});