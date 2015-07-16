(function(window){
  
  var TEMP = [];

  // SUA
  for (var i = 0; i < 35; i++) {
    TEMP.push({
      id: 1,
      lat: 30 + Math.floor((Math.random() * 18) + 1),
      lng: -115 + Math.floor((Math.random() * 28) + 1),
      icon: "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-10a121/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/ducati-diavel.png"
    })
  }

  // AFRICA
  for (var i = 0; i < 35; i++) {
    TEMP.push({
      id: 1,
      lat: 0 + Math.floor((Math.random() * 25) + 1),
      lng: 0 + Math.floor((Math.random() * 30) + 1),
      icon: "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-505c9c/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/fourbyfour.png"  
    });
  }

  // RUSSIA
  for (var i = 0; i < 50; i++) {
    TEMP.push({
      id: 1,
      lat: 45 + Math.floor((Math.random() * 20) + 1),
      lng: 40 + Math.floor((Math.random() * 100) + 1),
      icon: "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-fc9a08/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/truck3.png"
    });
  }

  var DB = (function(){
    function DB(name){
      // connection

      // temporary database
      this.MARKERS = TEMP;
    }

    DB.prototype = {}

    return DB;
  }())

  DB.create = function(name){
    return new DB();
  }

  window.DB = DB;

}(window))