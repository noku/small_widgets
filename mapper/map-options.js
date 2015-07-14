(function(window, google, mapper){

  mapper.MAP_OPTIONS = {
    center: {
      lat: 37.791350,
      lng: -122.435883
    },
    zoom: 10,
    disableDefaultUI: false,
    scroolwheel: true,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: 15,
    minZoom: 9,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    positionOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  }

  mapper.EXAMPLE_INFO = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru,' +
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

}(window, google, window.Mapper || (window.Mapper = {})))

// for more information visit 
// https://developers.google.com/maps/documentation/javascript/reference
// google.maps.MapOptions : proprites