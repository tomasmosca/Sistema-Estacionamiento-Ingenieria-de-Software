function loadDoc(url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var ele = document.getElementById("carga");
            var cont = 0;
            var tabla = document.getElementById("tablaInfracciones");   //se crea la tabla
            var fila0 = tabla.insertRow(cont);                          //primera fila y columnas
            var celda1 = fila0.insertCell(0);
            var celda2 = fila0.insertCell(1);
            var celda3 = fila0.insertCell(2);

            var texto = JSON.parse(this.responseText)               //se convierte el json a objeto
            var infraccion = texto.infracciones;
            console.log(infraccion);
            celda1.innerHTML = "<strong>ID</strong>";               //se inserta el texto en las celdas(primera fila)
            celda2.innerHTML = "<strong>Tipo</strong>";
            celda3.innerHTML = "<strong>Monto a pagar</strong>";
            cont++;                                                 //siguiente fila

            for (i=0;i<infraccion.length;i++){
                if(infraccion[i].id != undefined){    
                    var id = infraccion[i].id;                 //se obtienen los atributos del objeto infraccion
                    var tipo = obtenerInfraccion(infraccion[i].tipoInfraccion);
                    var monto = infraccion[i].montoAPagar;
                    var fila1 = tabla.insertRow(cont);         //segunda fila y columnas
                    var celda1 = fila1.insertCell(0);
                    var celda2 = fila1.insertCell(1);
                    var celda3 = fila1.insertCell(2);
                    celda1.innerHTML = id;                     //se inserta el texto en las celdas
                    celda2.innerHTML = tipo;
                    celda3.innerHTML = monto;
                    cont++;                                    //siguiente fila
                }
            }
            ele.style.display = "none";
            }
        };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function obtenerInfraccion(n){
    var xmlhttprequest = new XMLHttpRequest();
    var textoInfraccion;
    var url = "https://infraccionesweb.herokuapp.com/api/tiposInfraccion/"+n+"/";

    xmlhttprequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var infraccion = JSON.parse(this.responseText);
            textoInfraccion = infraccion.tipo.descripcion;
        }
    };
    xmlhttprequest.open("GET", url, false);
    xmlhttprequest.send();
    
    return textoInfraccion;
}

function cargarTabla(){
    var textoPatente = document.getElementById("patente").value;
	var url = "https://infraccionesweb.herokuapp.com/api/"+textoPatente+"/infracciones/";
    if(textoPatente != ""){
        var elem = document.getElementById("carga");
        elem.style.display = "inline";
    }
	loadDoc(url);
}

// le faltaria determinar el acarreo. falta mejorar la tabla con bootstrap