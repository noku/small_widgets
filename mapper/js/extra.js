  function drop() {
    for (var i = 0; i < db.MARKERS.length; i++) {
      setTimeout(function() {
         addMarker();
      }, i * 200);
    }
  }

  function addMarker() {
    mapper.mapper("addMarker",  db.MARKERS[iterator])
    iterator++;
  }

  drop();
