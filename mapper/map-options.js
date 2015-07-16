(function(window, google, mapper){

  var styles = [
  {
    "featureType":"water",
    "stylers":[{
      "color":"#46bcec"
    },{
      "visibility":"on"
    }]},{
      "featureType":"landscape",
      "stylers":[{"color":"#f2f2f2"
    }]},{
      "featureType":"road",
      "stylers":[{"saturation":-100},{"lightness":45
    }]},{
      "featureType":"road.highway",
      "stylers":[{"visibility":"simplified"
    }]},{
      "featureType":"road.arterial",
      "elementType":"labels.icon",
      "stylers":[{"visibility":"off"
    }]},{
      "featureType":"administrative",
      "elementType":"labels.text.fill",
      "stylers":[{"color":"#444444"
    }]},{
      "featureType":"transit",
      "stylers":[{"visibility":"off"
    }]},{
      "featureType":"poi",
      "stylers":[{"visibility":"off"
    }]}];

  mapper.MAP_OPTIONS = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 2,
    disableDefaultUI: false,
    scroolwheel: true,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: 15,
    // minZoom: 9,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    positionOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    styles: styles,
    geocoder: true,
    cluster: true
  }

}(window, google, window.Mapper || (window.Mapper = {})))

// for more information visit 
// https://developers.google.com/maps/documentation/javascript/reference
// google.maps.MapOptions : proprites