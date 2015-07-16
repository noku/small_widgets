$(function() {

  var availableTags = [],
      db = DB.create("maps");

  db.MARKERS.forEach(function(marker){
    availableTags.push(marker.name);        
  });
  
  var setPosition = function(lat, lng){
      var gMap = mapper.mapper("getMap")
      gMap.setCenter(new google.maps.LatLng( lat, lng ) );
      gMap.setZoom(8);  
  }


  $('#marker').bind('keypress', function(e) {
    if(e.keyCode==13){
      var query = $("#marker").val(),
          found = mapper.mapper("findMarkers", function(marker){
            return marker.name === query
          });

      setPosition(found[0].lat,found[0].lng);
    }
  });

  $( "#marker" ).autocomplete({
    source: availableTags
  });
});
