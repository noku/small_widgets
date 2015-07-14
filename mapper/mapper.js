(function(window, google){

  var Mapper = (function(){
    function Mapper(element, opts){
      this.gMap = new google.maps.Map(element, opts);
    }

    Mapper.prototype = {
    }

    return Mapper;
  }());

  Mapper.create = function(element, opts){
    return new Mapper(element, opts);
  }

  window.Mapper = Mapper;

}(window, google))

// for more information visit 
// https://developers.google.com/maps/documentation/javascript/reference
// google.maps.MapOptions : events