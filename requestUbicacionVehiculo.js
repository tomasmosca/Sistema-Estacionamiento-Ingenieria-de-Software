function loadDoc(url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var texto = JSON.parse(this.responseText);
            var deposito = texto.acarreo.deposito;

            if(texto.acarreo.infraccionId != undefined){
                var textoAcarreo;
                if(deposito != undefined){
                    popup=',"'+deposito.nombre+'"'+',"'+deposito.direccion+'"'+',"'+deposito.telefono+'"'+',"'+deposito.horarios+'"';
                    textoAcarreo = "El vehículo con infracción " + "<strong>"+texto.infraccion+"</strong>" + " y patente " + "<strong>"+texto.patente+"</strong>" + 
                    " se encuentra en el deposito " + "<strong>"+deposito.nombre+"</strong>" + 
                    " con la dirección " + "<strong>"+deposito.direccion+"</strong>" + ". El número de teléfono es " + "<strong>"+deposito.telefono+"</strong>" + 
                    " y los horarios son " + "<strong>"+deposito.horarios+
                    "<a onclick='vermas()' href='javascript:bootstrap("+deposito.ubicacion.lat+","+deposito.ubicacion.lon+popup+")' id='ver'> Ver en el mapa</a></strong>";
                }

                var descripcionAcarreo = document.getElementById("respuestaTexto");
                descripcionAcarreo.innerHTML = textoAcarreo;   
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function cargarTexto(){
    var textoPatente = document.getElementById("patente").value;
    var idInfraccion = document.getElementById("idInfraccion").value;
    var url = "https://infraccionesweb.herokuapp.com/api/"+textoPatente+"/acarreos/"+idInfraccion;
    loadDoc(url);
}

function vermas() {
    var eldiv =document.getElementById("mapid");
    //Cuando no se vea el mapa
    if (eldiv.style.display === "block"){
        document.getElementById("ver").innerHTML='Ver en el mapa';
        eldiv.style.display="none";
    }else{  //Cuando se vea el mapa
    //document.getElementById("ver").innerHTML='Ocultar';
    eldiv.style.display="block";
    } 
}
