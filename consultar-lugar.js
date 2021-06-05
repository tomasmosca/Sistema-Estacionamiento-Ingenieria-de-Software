function bootstrap() {

  var ungsLocation = [-34.5221554, -58.7000067];
  var map = L.map('mapid').setView(ungsLocation, 15);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.polygon([
    L.latLng(-34.515594, -58.705654),
    L.latLng(-34.523503, -58.714062),
    L.latLng(-34.519177, -58.719890),
    L.latLng(-34.511089, -58.711374),
    L.latLng(-34.514062, -58.707909),
    L.latLng(-34.513824, -58.707584)
]).addTo(map);

  var ungsMarker=L.marker(ungsLocation);
  ungsMarker.addTo(map);

  var cluster = L.markerClusterGroup();
  cluster.addLayers([
    ungsMarker,
    L.marker([-34.533755, -58.692713]),
    L.marker([-34.516181, -58.716625])
  ])

  cluster.addTo(map);
  //map.addLayer(cluster);
}