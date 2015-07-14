(function(window, google){

  var Mapper = (function(){
    function Mapper(element, opts){
      this.gMap = new google.maps.Map(element, opts);
    }

    Mapper.prototype = {
      _on : function(event, callback){
        var self = this;
        google.maps.event.addListener(this.gMap, event, function(e){
          callback.call(self, e)
        });
      }
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