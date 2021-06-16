function bootstrap(lat,lon,nombreDep, dirDep,telefono,horarios) { 
  // VER INFO https://infraccionesweb.herokuapp.com/api/ABC123/acarreos/42
  // ---Se Crea Mapa---
  //UBICACION DE MAPA AL ABRIR
  var ungsLocation = [lat,lon];

  var map = L.map('mapid').setView(ungsLocation, 16);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.control.custom({
    position: 'bottomleft',
    content : '<button class="btn btn-default btn-sm" id="cerrar">'+
              '<strong>Cerrar</strong>'+
              '</button>',
    classes : '',
    style   :
    {
      margin: '5px 20px',
      padding: '0px',
    },
    events:
    {
      click: function()
      {
        /*PARA CERRA PANTALLA*/
        document.getElementById("mapid").style.display="none";
      }
    }
  })
  .addTo(map);
    
  L.control.Legend({
    position: "bottomright",
    collapsed: false,
    symbolWidth: 24,
    opacity: 1,
    column: 1,
    legends: [{
      label: "Ubicacion Actual",
      type: "image",
      url: "leaflet/images/grua.png"
    }]
  }).addTo(map);

  // ---Info de Acarreo---
  var miAcarreo = new acarreo(nombreDep,dirDep,L.latLng(lat,lon),telefono,horarios);
  
  // --icono--
  var iconoAuto = new L.Icon({
    iconUrl: 'leaflet/images/grua.png',
    iconSize: [45, 50],
    iconAnchor: [12, 41],
    popupAnchor: [10, -24],
  });

  // ---Marcador---
  var markerMiAcarreo = L.marker(miAcarreo.ubicacion,  {icon: iconoAuto});
  
  //POPUP
  markerMiAcarreo.bindPopup("<b>Ubicación Actual</b><br>"+"<b>Deposito</b><br>"+"Nombre: "+miAcarreo.nombre+"<br>"+"Calle: "+miAcarreo.calle+"<br>"+"Teléfono: "+miAcarreo.telefono+"<br>"+"Horarios: "+miAcarreo.horarios).openPopup();
  
  map.addLayer(markerMiAcarreo);

  var popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("Posicion Clickeada: " + e.latlng.toString())
      .openOn(map);
  }

  map.on('click', onMapClick);
}