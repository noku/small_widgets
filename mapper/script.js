(function(window, $) {
  
  var mapper = $('#map-canvas').mapper(Mapper.MAP_OPTIONS);

  mapper.mapper("addMarker", {
    id: 1,
    lat: 37.791350,
    lng: -122.435883,
    content: mapper.EXAMPLE_INFO,
    icon: "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-9d7050/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/pickup_camper.png"  
  });

  // mapper.mapper("addMarker", {
  //   id: 1,
  //   lat: 37.79920,
  //   lng: -122.435883,
  //   content: mapper.EXAMPLE_INFO,
  //   icon: "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-9d7050/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/pickup_camper.png"  
  // });

  mapper.mapper("addMarker", {
    location: "Golden Gate Bridge, San Francisco, CA"
  });

}(window, jQuery ))