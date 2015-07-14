(function(window, google, mapper) {
  
  var options = mapper.MAP_OPTIONS,
      element = document.getElementById('map-canvas'),
      map = mapper.create(element, options);

  map._on("click", function(e){
    console.log('click');
    console.log(e);
    console.log(this);
  })
  
}(window, google, window.Mapper))