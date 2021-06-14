function bootstrap(lat,lon,nombreDep, dirDep,horarios) { // VER INFO https://infraccionesweb.herokuapp.com/api/ABC123/acarreos/42
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
             // window.history.back();
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
          label: "Estacionamiento Actual",
          type: "image",
          url: "leaflet/images/icons8-car-30.png"
      }]
    }).addTo(map);

    // ---Elementos Zona Azul---

	  var miAcarreo = new acarreo(nombreDep,dirDep,L.latLng(lat,lon),horarios);
   
    // --iconos--

    var iconoAuto = new L.Icon({
      iconUrl: 'leaflet/images/icons8-car-30.png',
      iconSize: [45, 50],
      iconAnchor: [12, 41],
      popupAnchor: [10, -24],
  });

    
    // ---Marcadores y Cluster zona Azul---

    var markerMiAcarreo = L.marker(miAcarreo.ubicacion,  {icon: iconoAuto});
	  markerMiAcarreo.bindPopup("<b>Ubicación Actual</b><br>"+"Nombre: "+miAcarreo.nombre+"<br>"+"Calle: "+miAcarreo.calle+"<br>"+"Horarios: "+miAcarreo.horarios).openPopup();
   
    map.addLayer(markerMiAcarreo);

    //POPUP
    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Posicion Clickeada: " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);

  }
