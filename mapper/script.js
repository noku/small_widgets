(function(window, google, mapper) {
  
      console.log(mapper)

  var options = mapper.MAP_OPTIONS,
      element = document.getElementById('map-canvas'),
      map = mapper.create(element, options);

  
}(window, google, window.Mapper))