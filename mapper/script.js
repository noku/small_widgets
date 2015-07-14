(function(window, google, mapper) {
  
  var options = mapper.MAP_OPTIONS,
      element = document.getElementById('map-canvas'),
      map = mapper.create(element, options);

  map.addMarker({
    lat: 37.791350,
    lng: -122.435883,
    draggable: true,
    event: {
      name : "click",
      callback: function(){
        alert("I am clicked");
      }
    },
    icon: "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-9d7050/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/pickup_camper.png"
  });
  
}(window, google, window.Mapper))