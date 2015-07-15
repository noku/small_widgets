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
      this.map.addMarker(opts);
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