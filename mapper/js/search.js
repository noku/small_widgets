$(function() {

  var availableTags = [],
      db = DB.create("maps");

  db.MARKERS.forEach(function(marker){
    availableTags.push(marker.name);        
  });

  $( "#marker" ).autocomplete({
    source: availableTags
  });
});
