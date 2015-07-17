$(function() {

  var availableTags = [],
      db = DB.create("maps"),
      gMap = mapper.mapper("getMap");


  db.MARKERS.forEach(function(marker){
    availableTags.push(marker.name);        
  });
  
  var setPosition = function(lat, lng, found){
      gMap.setCenter(new google.maps.LatLng( lat, lng ) );
      gMap.setZoom(8);  
      found.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ found.setAnimation(null); }, 3750);
  }

  $('#marker').bind('keypress', function(e) {
    // on enter
    if(e.keyCode==13){
      var query = $("#marker").val(),
          // array of markers
          found = mapper.mapper("findMarkers", function(marker){
            return marker.name === query
          });

      if(found.length > 0){
        setPosition(found[0].lat,found[0].lng, found[0]);      
      } else {
        alert("Marker with this name not found");
      }
    }
  });

  $( "#marker" ).autocomplete({
    source: availableTags
  });
});
