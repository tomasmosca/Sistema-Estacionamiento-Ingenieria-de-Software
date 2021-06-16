function bootstrap() {

  // ---Se Crea Mapa---
  var ungsLocation = [-34.519747, -58.709157];

  var map = L.map('mapid').setView(ungsLocation, 16);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.control.custom({
    position: 'bottomleft',
    content : '<button class="btn btn-default btn-sm" id="volver">'+
              '<strong>Volver Atras</strong>'+
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
          window.history.back();
      }
    }
  })
  .addTo(map);
  
  L.control.Legend({
    position: "bottomright",
    collapsed: false,
    symbolWidth: 24,
    opacity: 1,
    column: 2,
    legends: [{
        label: "Estacionamiento Azul",
        type: "image",
        url: "leaflet/images/parking1.png",
    }, {
        label: "Estacionamiento Verde",
        type: "image",
        url: "leaflet/images/parking2.png"
    }, {
        label: "Estacionamiento Actual",
        type: "image",
        url: "leaflet/images/icons8-car-30.png"
    }, {
        label: "Zona Azul",
        type: "polyline",
        color: "#0000ff",
        fillColor: "#0000ff",
        weight: 2,
        layers: polygonZonaAzul
    }, {
        label: "Zona Verde",
        type: "polyline",
        color: "#008f39",
        fillColor: "#008f39",
        weight: 2,
        layers: polygonZonaVerde
    }]
  }).addTo(map);

  // ---Elementos Zona Azul---

  var zonaAzul = new zona("azul", [
  L.latLng(-34.515594, -58.705654),
  L.latLng(-34.523503, -58.714062),
  L.latLng(-34.519177, -58.719890),
  L.latLng(-34.511089, -58.711374),
  L.latLng(-34.514062, -58.707909),
  L.latLng(-34.513824, -58.707584),
  ]);

  var estacionamientosAzules = [];
  estacionamientosAzules[0] = new estacionamiento("aaaa-0001",zonaAzul,L.latLng(-34.51601,-58.71135),"libre","");
  estacionamientosAzules[1] = new estacionamiento("bbbb-0002",zonaAzul,L.latLng(-34.51707,-58.71518),"libre","");
  estacionamientosAzules[2] = new estacionamiento("cccc-0003",zonaAzul,L.latLng(-34.51930, -58.71246),"libre","");
  estacionamientosAzules[3] = new estacionamiento("dddd-0004",zonaAzul,L.latLng(-34.52130, -58.71546),"libre","");
  estacionamientosAzules[4] = new estacionamiento("eeee-0005",zonaAzul,L.latLng(-34.51530, -58.71446),"libre","");
  estacionamientosAzules[5] = new estacionamiento("ffff-0006",zonaAzul,L.latLng(-34.51930, -58.71846),"libre","");

  var miEstacionamiento = new estacionamiento("abc-123",zonaAzul,L.latLng(-34.52079,-58.71300),"ocupado","AAA-000");

  var polygonZonaAzul = L.polygon(zonaAzul.limites).addTo(map);
  polygonZonaAzul.bindPopup("Zona Azul");

  // --iconos--

  var iconoEstacionamientoAzul = new L.Icon({
      iconUrl: 'leaflet/images/parking1.png',
      shadowUrl: 'leaflet/images/marker-shadow.png',
      iconSize: [60, 65],
      iconAnchor: [12, 41],
      popupAnchor: [17, -24],
      shadowSize: [91, 55]
  });

  var iconoEstacionamientoVerde = new L.Icon({
    iconUrl: 'leaflet/images/parking2.png',
    shadowUrl: 'leaflet/images/marker-shadow.png',
    iconSize: [60, 65],
    iconAnchor: [12, 41],
    popupAnchor: [17, -24],
    shadowSize: [91, 55]
  });

  var iconoAuto = new L.Icon({
    iconUrl: 'leaflet/images/icons8-car-30.png',
    iconSize: [45, 50],
    iconAnchor: [12, 41],
    popupAnchor: [10, -24],
  });

  var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'left'
  });
  
  map.addControl(sidebar);

  setTimeout(function () {
    sidebar.show();
  }, 500);

  map.on('click', function () {
    sidebar.hide();
  })

  // ---Marcadores y Cluster zona Azul---

  var markerMiEstacionamiento = L.marker(miEstacionamiento.ubicacion,  {icon: iconoAuto});
  markerMiEstacionamiento.bindPopup("<b>Estacionamiento Actual</b><br>"+"Código: "+miEstacionamiento.codigoUbicacion+"<br>"+"Zona: "+miEstacionamiento.zona.color+"<br>"+"Estado: "+miEstacionamiento.disponibilidad).openPopup();
  markerMiEstacionamiento.on('click', function () {
    sidebar.setContent("<h1>Estacionamiento Actual</h1><br>"+"<h3>Información adicional</h3><br>"+"Su código de estacionamiento es "+miEstacionamiento.codigoUbicacion+"<br>"+"Su vehículo se encuentra en zona "+miEstacionamiento.zona.color
    +"<br>"+"El estacionamiento actual se encuentra "+miEstacionamiento.disponibilidad+"<br>"+"La patente de su vehículo es "+miEstacionamiento.patente+"<br>"+"La hora de inicio del estacionamiento fue "
    +miEstacionamiento.horaInicio+" Hs"+"<br>"+"Para obtener el costo de la estadía finalice su estacionamiento desde el menú principal.");
    sidebar.toggle();
  });
  map.addLayer(markerMiEstacionamiento);

  var markersEstacionamientosAzules = [];
  for(i=0;i<estacionamientosAzules.length;i++){
    markersEstacionamientosAzules[i] = L.marker(estacionamientosAzules[i].ubicacion,  {icon: iconoEstacionamientoAzul});
    markersEstacionamientosAzules[i].bindPopup("<b>Estacionamiento</b><br>"+"Código: "+estacionamientosAzules[i].codigoUbicacion+"<br>"+"Zona: "+estacionamientosAzules[i].zona.color+"<br>"+"Estado: "+estacionamientosAzules[i].disponibilidad).openPopup();
    map.addLayer(markersEstacionamientosAzules[i]);
  }

  var clusterZonaAzul = L.markerClusterGroup();
  clusterZonaAzul.addLayers([
    markersEstacionamientosAzules[0],markersEstacionamientosAzules[1],markersEstacionamientosAzules[2], markersEstacionamientosAzules[3], 
    markersEstacionamientosAzules[4], markersEstacionamientosAzules[5], markerMiEstacionamiento
    ]);
  map.addLayer(clusterZonaAzul);

  // ---Elementos Zona Verde---

  var zonaVerde = new zona("verde", [
    L.latLng(-34.515769, -58.705573),
    L.latLng(-34.523671, -58.713834),
    L.latLng(-34.528003, -58.70774),
    L.latLng(-34.52056, -58.699844),
    L.latLng(-34.51568, -58.705552),
    //L.latLng(-34.513824, -58.707584),
  ]);

  var polygonZonaVerde = L.polygon(zonaVerde.limites, {color: 'green'}).addTo(map);
  polygonZonaVerde.bindPopup("Zona Verde");

  var estacionamientosVerdes = [];
  estacionamientosVerdes[0] = new estacionamiento("dfgf-0032",zonaVerde,L.latLng(-34.524405, -58.707955),"libre","");
  estacionamientosVerdes[1] = new estacionamiento("hjy-005",zonaVerde,L.latLng(-34.521126, -58.706539),"libre","");
  estacionamientosVerdes[2] = new estacionamiento("cfgs-0073",zonaVerde,L.latLng(-34.520489, -58.70214),"libre","");

  var markersEstacionamientosVerdes = [];
  for(i=0;i<estacionamientosVerdes.length;i++){
    markersEstacionamientosVerdes[i] = L.marker(estacionamientosVerdes[i].ubicacion,  {icon: iconoEstacionamientoVerde});
    markersEstacionamientosVerdes[i].bindPopup("<b>Estacionamiento</b><br>"+"Código: "+estacionamientosVerdes[i].codigoUbicacion+"<br>"+"Zona: "+estacionamientosVerdes[i].zona.color+"<br>"+"Estado: "+estacionamientosVerdes[i].disponibilidad).openPopup();
    map.addLayer(markersEstacionamientosVerdes[i]);
  }

  var clusterZonaVerde = L.markerClusterGroup();
  clusterZonaVerde.addLayers([
    markersEstacionamientosVerdes[0],markersEstacionamientosVerdes[1],markersEstacionamientosVerdes[2]
    ]);
  map.addLayer(clusterZonaVerde);

  //para armar zonas
  var popup = L.popup();

  function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("Posicion Clickeada: " + e.latlng.toString())
          .openOn(map);
  }

  map.on('click', onMapClick);

  //sidebar.show();
}