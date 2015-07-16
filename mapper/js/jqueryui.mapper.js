(function(window, Mapper ){

  $.widget( "mapper.mapper", {
    // default options
    options: {
    },

    // the constructor
    _create: function() {
      var element = this.element[0],
          options = this.options;
      this.map = Mapper.create(element, options)
    },

    addMarker: function(opts) {
      var self = this;
      if(opts.location){
        this.map.geocode({
          address: opts.location, 
          success: function(results){
            results.forEach(function(result){
              opts.lat = result.geometry.location.lat();
              opts.lng = result.geometry.location.lng();
              self.map.addMarker(opts);
            });
          },
          error: function(){
            console.log(status);
          }
        })
      } else {
        this.map.addMarker(opts);      
      }
    },

    getMap: function(){
      return this.map.gMap;
    },

    findMarkers: function(callback) {
      return this.map.findBy(callback);
    },

    markers: function(){
      return this.map.markers.items;
    },

    removeMarkers: function(callback){
      return this.map.removeBy(callback);
    }
  });
 
}(window, Mapper ))