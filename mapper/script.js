(function(window, $, DB) {
  
  var mapper = $('#map-canvas').mapper(Mapper.MAP_OPTIONS),
      db = DB.create("maps");

  db.MARKERS.forEach(function(marker){
    mapper.mapper("addMarker", marker)
  });

}(window, jQuery, DB))