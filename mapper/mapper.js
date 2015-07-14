(function(window, google){

  var Mapper = (function(){
    function Mapper(element, opts){
      this.gMap = new google.maps.Map(element, opts);
    }

    Mapper.prototype = {

      _on : function(opts){
        var self = this;
        google.maps.event.addListener(opts.obj, opts.event, function(e){
          opts.callback.call(self, e)
        });
      },

      addMarker: function(opts){
        var marker;
        opts.position = {
          lat : opts.lat,
          lng : opts.lng
        }
        marker = this._createMarker(opts);
        if(opts.event){
          this._on({
            obj: marker,
            event: opts.event.name,
            callback: opts.event.callback
          })
        }
      },

      _createMarker: function(opts){
        opts.map = this.gMap;
        return new google.maps.Marker(opts);
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