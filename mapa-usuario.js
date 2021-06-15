//leaflet/images/icons8-car-30.png
function bootstrap() {

    // ---Se Crea Mapa---

    var ungsLocation = [-34.5221554, -58.7000067];

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
      column: 1,
      legends: [{
          label: "Comercio",
          type: "image",
          url: "leaflet/images/icons8-shop-location-48.png",
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

    var zonaAzul = new zona("azul", [
		L.latLng(-34.515594, -58.705654),
		L.latLng(-34.523503, -58.714062),
		L.latLng(-34.519177, -58.719890),
		L.latLng(-34.511089, -58.711374),
		L.latLng(-34.514062, -58.707909),
		L.latLng(-34.513824, -58.707584),
	]);

  var zonaVerde = new zona("verde", [
    L.latLng(-34.515769, -58.705573),
    L.latLng(-34.523671, -58.713834),
    L.latLng(-34.528003, -58.70774),
    L.latLng(-34.52056, -58.699844),
    L.latLng(-34.51568, -58.705552),
    //L.latLng(-34.513824, -58.707584),
  ]);

    var comercios = [];
    comercios[0] = new comercio("Panaderia Imperio","imp-3423",zonaAzul,"Maza","2870",L.latLng(-34.516035, -58.708301));
    comercios[1] = new comercio("Polleria Pipicucu","cucu-4632",zonaAzul,"Velazquez","3286",L.latLng(-34.516095, -58.716576));
    comercios[2] = new comercio("Panaderia La Moderna","moderna-3453",zonaAzul,"25 de Mayo","901",L.latLng(-34.515194, -58.713416));
    comercios[3] = new comercio("Tienda Si Mona","si-2675",zonaAzul,"Comodoro Rivadavia","2603",L.latLng(-34.519650, -58.715463));
    comercios[4] = new comercio("Centro Comerical Jimena","jim-1145",zonaAzul,"Lourdes","3265",L.latLng(-34.518371, -58.718408));
    comercios[5] = new comercio("La Madeleine","mad-5464",zonaVerde,"Carlos Pellegrini","699",L.latLng(-34.523402, -58.705562));
    comercios[6] = new comercio("Maxikiosco","max-2323",zonaVerde,"Juan Mazza","2346",L.latLng(-34.519261, -58.703906));
    comercios[7] = new comercio("Panaderia La Colonial","colo-2315",zonaVerde,"Eva Peron","487",L.latLng(-34.52349, -58.707939));
  
    var polygonZonaAzul = L.polygon(zonaAzul.limites).addTo(map);
    //polygonZonaAzul.bindPopup("Zona Azul");

    var polygonZonaVerde = L.polygon(zonaVerde.limites, {color: 'green'}).addTo(map);
    //polygonZonaVerde.bindPopup("Zona Verde");

    // --iconos--

    var iconoComercios = new L.Icon({
        iconUrl: 'leaflet/images/icons8-shop-location-48.png',
        iconSize: [50, 55],
        iconAnchor: [12, 41],
        popupAnchor: [17, -24],
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

    // ---Marcadores y Cluster---

    var markersComercios = [];
    for(i=0;i<comercios.length;i++){
      markersComercios[i] = L.marker(comercios[i].ubicacion,  {icon: iconoComercios});
      markersComercios[i].bindPopup("<b>Comercio</b><br>"+"Nombre: "+comercios[i].nombre+"<br>"+"Zona: "+comercios[i].zona.color+"<br>"+"Calle: "+comercios[i].calle).openPopup();
      map.addLayer(markersComercios[i]);
    }

    markersComercios[0].on('click', function () {
      sidebar.setContent("<h1>Comercio</h1><br>"+"<h3>"+comercios[0].nombre+"</h3><br>"+"<i class='fas fa-map-marker'></i>"+" "+comercios[0].calle+" "+comercios[0].altura+
      ", Provincia de Buenos Aires<br>"+"<i class='fas fa-clock'></i>"+" "+"<strong>Horarios:</strong> 8:00-20:00<br>"+"<i class='fas fa-stream'></i>"+" "+"<strong>Codigo:</strong> "+comercios[0].codigo+"<br>"+"<i class='fas fa-map-marked'></i>"+" "+"<strong>Zona:</strong> "+comercios[0].zona.color+"<br>"+"<img src=./leaflet/images/imgimperio.png />");
      sidebar.toggle();
    });

    markersComercios[1].on('click', function () {
      sidebar.setContent("<h1>Comercio</h1><br>"+"<h3>"+comercios[1].nombre+"</h3><br>"+"<i class='fas fa-map-marker'></i>"+" "+comercios[1].calle+" "+comercios[1].altura+
      ", Provincia de Buenos Aires<br>"+"<i class='fas fa-clock'></i>"+" "+"<strong>Horarios:</strong> 7:00-20:00<br>"+"<i class='fas fa-stream'></i>"+" "+"<strong>Codigo:</strong> "+comercios[1].codigo+"<br>"+"<i class='fas fa-map-marked'></i>"+" "+"<strong>Zona:</strong> "+comercios[1].zona.color+"<br>"+"<img src=./leaflet/images/imgpolleria.png />");
      sidebar.toggle();
    });

    markersComercios[2].on('click', function () {
      sidebar.setContent("<h1>Comercio</h1><br>"+"<h3>"+comercios[2].nombre+"</h3><br>"+"<i class='fas fa-map-marker'></i>"+" "+comercios[2].calle+" "+comercios[2].altura+
      ", Provincia de Buenos Aires<br>"+"<i class='fas fa-clock'></i>"+" "+"<strong>Horarios:</strong> 8:30-20:00<br>"+"<i class='fas fa-stream'></i>"+" "+"<strong>Codigo:</strong> "+comercios[2].codigo+"<br>"+"<i class='fas fa-map-marked'></i>"+" "+"<strong>Zona:</strong> "+comercios[2].zona.color+"<br>"+"<img src=./leaflet/images/panaderiamoderna.png />");
      sidebar.toggle();
    });

    markersComercios[3].on('click', function () {
      sidebar.setContent("<h1>Comercio</h1><br>"+"<h3>"+comercios[3].nombre+"</h3><br>"+"<i class='fas fa-map-marker'></i>"+" "+comercios[3].calle+" "+comercios[3].altura+
      ", Provincia de Buenos Aires<br>"+"<i class='fas fa-clock'></i>"+" "+"<strong>Horarios:</strong> 8:00-20:00<br>"+"<i class='fas fa-stream'></i>"+" "+"<strong>Codigo:</strong> "+comercios[3].codigo+"<br>"+"<i class='fas fa-map-marked'></i>"+" "+"<strong>Zona:</strong> "+comercios[3].zona.color+"<br>"+"<img src=./leaflet/images/tienda.png />");
      sidebar.toggle();
    });

    markersComercios[4].on('click', function () {
      sidebar.setContent("<h1>Comercio</h1><br>"+"<h3>"+comercios[4].nombre+"</h3><br>"+"<i class='fas fa-map-marker'></i>"+" "+comercios[4].calle+" "+comercios[4].altura+
      ", Provincia de Buenos Aires<br>"+"<i class='fas fa-clock'></i>"+" "+"<strong>Horarios:</strong> 7:30-19:00<br>"+"<i class='fas fa-stream'></i>"+" "+"<strong>Codigo:</strong> "+comercios[4].codigo+"<br>"+"<i class='fas fa-map-marked'></i>"+" "+"<strong>Zona:</strong> "+comercios[4].zona.color+"<br>"+"<img src=./leaflet/images/centrojimena.png />");
      sidebar.toggle();
    });

    markersComercios[5].on('click', function () {
      sidebar.setContent("<h1>Comercio</h1><br>"+"<h3>"+comercios[5].nombre+"</h3><br>"+"<i class='fas fa-map-marker'></i>"+" "+comercios[5].calle+" "+comercios[5].altura+
      ", Provincia de Buenos Aires<br>"+"<i class='fas fa-clock'></i>"+" "+"<strong>Horarios:</strong> 7:00-21:00<br>"+"<i class='fas fa-stream'></i>"+" "+"<strong>Codigo:</strong> "+comercios[5].codigo+"<br>"+"<i class='fas fa-map-marked'></i>"+" "+"<strong>Zona:</strong> "+comercios[5].zona.color+"<br>"+"<img src=./leaflet/images/madeleine.png />");
      sidebar.toggle();
    });

    markersComercios[6].on('click', function () {
      sidebar.setContent("<h1>Comercio</h1><br>"+"<h3>"+comercios[6].nombre+"</h3><br>"+"<i class='fas fa-map-marker'></i>"+" "+comercios[6].calle+" "+comercios[6].altura+
      ", Provincia de Buenos Aires<br>"+"<i class='fas fa-clock'></i>"+" "+"<strong>Horarios:</strong> 8:30-20:00<br>"+"<i class='fas fa-stream'></i>"+" "+"<strong>Codigo:</strong> "+comercios[6].codigo+"<br>"+"<i class='fas fa-map-marked'></i>"+" "+"<strong>Zona:</strong> "+comercios[6].zona.color+"<br>"+"<img src=./leaflet/images/maxikiosco.png />");
      sidebar.toggle();
    });

    markersComercios[7].on('click', function () {
      sidebar.setContent("<h1>Comercio</h1><br>"+"<h3>"+comercios[7].nombre+"</h3><br>"+"<i class='fas fa-map-marker'></i>"+" "+comercios[7].calle+" "+comercios[7].altura+
      ", Provincia de Buenos Aires<br>"+"<i class='fas fa-clock'></i>"+" "+"<strong>Horarios:</strong> 6:30-21:00<br>"+"<i class='fas fa-stream'></i>"+" "+"<strong>Codigo:</strong> "+comercios[7].codigo+"<br>"+"<i class='fas fa-map-marked'></i>"+" "+"<strong>Zona:</strong> "+comercios[7].zona.color+"<br>"+"<img src=./leaflet/images/panaderiacolonial.png />");
      sidebar.toggle();
    });

    var clusterZonaAzul = L.markerClusterGroup();
    clusterZonaAzul.addLayers([
      markersComercios[0],markersComercios[1],markersComercios[2], markersComercios[3], 
      markersComercios[4]
      ]);
    map.addLayer(clusterZonaAzul);

    var clusterZonaVerde = L.markerClusterGroup();
    clusterZonaVerde.addLayers([
      markersComercios[5],markersComercios[6],markersComercios[7]
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

  }
