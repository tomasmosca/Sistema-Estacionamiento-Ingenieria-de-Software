function bootstrap() {// var ubicacion = texto.acarreo.deposito.ubicacion;
                      // VER INFO https://infraccionesweb.herokuapp.com/api/ABC123/acarreos/42
    // ---Se Crea Mapa---
    //UBICACION DE MAPA AL ABRIR
    var ungsLocation = [-34.519079,-58.71900];//-34.522611, -58.71183

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

	  var miEstacionamiento = new estacionamiento("abc-123","azul",L.latLng(-34.52079,-58.71300),"ocupado","AAA-000");
  
    // --iconos--

    var iconoAuto = new L.Icon({
      iconUrl: 'leaflet/images/icons8-car-30.png',
      iconSize: [45, 50],
      iconAnchor: [12, 41],
      popupAnchor: [10, -24],
  });

    
    // ---Marcadores y Cluster zona Azul---

    var markerMiEstacionamiento = L.marker(miEstacionamiento.ubicacion,  {icon: iconoAuto});
	  markerMiEstacionamiento.bindPopup("<b>Estacionamiento Actual</b><br>"+"Codigo: "+miEstacionamiento.codigoUbicacion+"<br>"+"Zona: "+miEstacionamiento.zona.color+"<br>"+"Estado: "+miEstacionamiento.disponibilidad).openPopup();

    map.addLayer(markerMiEstacionamiento);

    // ---Elementos Zona Verde---

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

//falta manejar los errores 404 para cuando no se encuentra un id de infraccion o una patente con acarreo y cuando no funciona el servidor.
//falta manejar cuando no se encuentra un deposito
//falta mejorar bootstrap
//boton load