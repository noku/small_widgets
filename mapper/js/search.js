$(function() {
  var availableTags = [
    "Moto",
    "Truck",
    "Hummer"
  ];
  $( "#marker" ).autocomplete({
    source: availableTags
  });
});
