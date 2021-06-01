function loadDoc(url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var texto = JSON.parse(this.responseText);
            var deposito = texto.acarreo.deposito;
            console.log(deposito);

            if(texto.acarreo.infraccionId != undefined){
                var textoAcarreo;
                if(deposito != undefined){
                    textoAcarreo = "El vehiculo con infraccion " + "<strong>"+texto.infraccion+"</strong>" + " y patente " + "<strong>"+texto.patente+"</strong>" + 
                    " se encuentra en el deposito " + "<strong>"+deposito.nombre+"</strong>" + 
                    " con la direccion " + "<strong>"+deposito.direccion+"</strong>" + ". El numero de telefono es " + "<strong>"+deposito.telefono+"</strong>" + 
                    " y los horarios son " + "<strong>"+deposito.horarios+"</strong>";
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


//falta manejar los errores 404 para cuando no se encuentra un id de infraccion o una patente con acarreo y cuando no funciona el servidor.
//falta manejar cuando no se encuentra un deposito
//falta mejorar bootstrap
//boton load