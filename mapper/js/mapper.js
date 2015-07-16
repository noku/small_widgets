(function(window, google, List){

  var Mapper = (function(){
    function Mapper(element, opts){
      this.gMap = new google.maps.Map(element, opts);
      this.markers = List.create();
      if(opts.cluster){
        this.markerClusterer = new MarkerClusterer(this.gMap, []);        
      }
      if(opts.geocoder){
        this.geocoder = new google.maps.Geocoder();
      }
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
        if(this.markerClusterer){
          this.markerClusterer.addMarker(marker);         
        }
        this.markers.add(marker);
        if(opts.events){
          this._attachEvents(marker, opts.events);
        }

        if(opts.content){
           this._on({
              obj: marker,
              event: 'click',
              callback: function(){
                var infoWindow = new google.maps.InfoWindow({
                  content: opts.content
                });

                infoWindow.open(this.gMap, marker);
              }
            });
        }
      },

      findBy: function(callback){
        return this.markers.find(callback);
      },

      removeBy: function(callback){
        var self = this;
        return self.markers.find(callback, function(markers){
          markers.forEach(function(marker){
            if(self.markerClusterer){
              self.markerClusterer.removeMarker(marker);
            } else {
              marker.setMap(null);            
            }
          })
        })
      },

      geocode: function(opts){
        this.geocoder.geocode({
          address: opts.address
        }, function(results, status){
          if(status === google.maps.GeocoderStatus.OK){
            opts.success.call(this, results, status);
          } else {
            opts.error.call(this,status);
          }
        });
      },
      
      _attachEvents: function(obj, events){
        var self = this;
        events.forEach(function(event){
          self._on({
            obj: obj,
            event: event.name,
            callback: event.callback
          });
        });        
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

}(window, google, List))

// for more information visit 
// https://developers.google.com/maps/documentation/javascript/reference
// google.maps.MapOptions : events