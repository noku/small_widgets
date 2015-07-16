(function(window){
  
  var TEMP = [];

  var DESC = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">TITLE</h1>'+
      '<div id="bodyContent">'+
      '<p><b>TITLE</b>, ... description  ' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent'+
      'feugiat mollis risus vitae dictum. Nunc laoreet blandit congue. ' +
      'Mauris dictum molestie ante, in convallis mi porttitor vel. Curabitur '+
      'a lorem posuere, interdum justo vel, tristique libero. Curabitur quis'+
      'suscipit augue. Nullam luctus ut felis nec ullamcorper. Pellentesque vel ante nisl.</p>'+
      '<p>Attribution: COMMENTS,' +
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  // SUA
  for (var i = 0; i < 35; i++) {
    TEMP.push({
      id: 1,
      name: "Moto",
      lat: 30 + Math.floor((Math.random() * 18) + 1),
      lng: -115 + Math.floor((Math.random() * 28) + 1),
      content: DESC,
      icon: "http://i57.tinypic.com/2zhh06f.png"
    })
  }

  // AFRICA
  for (var i = 0; i < 35; i++) {
    TEMP.push({
      id: 1,
      name: "Hummer",
      lat: 0 + Math.floor((Math.random() * 25) + 1),
      lng: 0 + Math.floor((Math.random() * 30) + 1),
      content: DESC,
      icon: "http://i60.tinypic.com/jt14br.png"  
    });
  }

  // RUSSIA
  for (var i = 0; i < 50; i++) {
    TEMP.push({
      id: 1,
      name: "Truck",
      lat: 45 + Math.floor((Math.random() * 20) + 1),
      lng: 40 + Math.floor((Math.random() * 100) + 1),
      content: DESC,
      icon: "http://i57.tinypic.com/2vw5ua9.png"
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