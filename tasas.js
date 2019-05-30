function tasaInteres(tasa) {
    return tasa / 100;
}

function indexFunction() {
    event.preventDefault()
    // console.log('Hola tasas')
    var tasa = document.getElementById('tasaEntrada').value
    var tasaOrigen = document.getElementById('tasaOrigen').value
    var tiempoOrigen = document.getElementById('tiempoOrigen').value
    var tasaDestino = document.getElementById('tasaDestino').value
    var tiempoDestino = document.getElementById('tiempoDestino').value
    var antVenOrigen = document.getElementById('antVenOrigen').value
    var antVenDestino = document.getElementById('antVenDestino').value
    // console.log('tasa origen-->', tasaOrigen)


    /* mock datos de entrada */
    var datosPrimariosEntrada = {
        // 'I': 1.5,
        'vP': document.getElementById('vP').value,
        'n': document.getElementById('n').value,
    };

    var abono = [];
    abono[0] = {
        'abono': document.getElementById('abono1').value,
        'mes': document.getElementById('mesAbono1').value,
        'cuota': document.getElementById('capitalTiempo1').value
    };
    abono[1] = {
        'abono': document.getElementById('abono2').value,
        'mes': document.getElementById('mesAbono2').value,
        'cuota': document.getElementById('capitalTiempo2').value
    };
    abono[2] = {
        'abono': document.getElementById('abono3').value,
        'mes': document.getElementById('mesAbono3').value,
        'cuota': document.getElementById('capitalTiempo3').value
    };
    abono[3] = {
        'abono': document.getElementById('abono4').value,
        'mes': document.getElementById('mesAbono4').value,
        'cuota': document.getElementById('capitalTiempo4').value
    };


// tasa interes
    var tasainteres = tasaInteres(tasa);
    var valor = 0;

//    Efectiva Anticipada --> Nominal Vencida
    if (tasaOrigen == "Efectiva" && antVenOrigen == "Anticipada" && tasaDestino == "Nominal" && antVenDestino == "Vencida") {
        valor = tasainteres / (1 - tasainteres);
        valor = valor + 1;
        valor = Math.pow(valor, (tiempoOrigen / tiempoDestino));
        valor = valor - 1;
        valor = valor * tiempoDestino;
        valor = valor * 100;
        // console.log("La tasa convertida es: " + valor + "%");
    }
//    Nominal Vencida --> Efectiva Anticipada
    else if (tasaOrigen == "Nominal" && antVenOrigen == "Vencida" && tasaDestino == "Efectiva" && antVenDestino == "Anticipada") {
        valor = tasainteres / tiempoOrigen;
        valor = valor + 1;
        valor = Math.pow(valor, (tiempoOrigen / tiempoDestino));
        valor = valor - 1;
        valor = valor / (1 + valor);
        valor = valor * 100;
        // console.log("La tasa convertida es: " + valor + "%");
    }
//    Nominal Anticipada --> Efectiva Vencida
// tener en cuenta
    else if (tasaOrigen == "Nominal" && antVenOrigen == "Anticipada" && tasaDestino == "Efectiva" && antVenDestino == "Vencida") {
        valor = tasainteres / tiempoOrigen;
        valor = valor / (1 - valor);
        valor = valor + 1;
        valor = Math.pow(valor, (tiempoOrigen / tiempoDestino));
        valor = valor - 1;
        valor = valor * 100;
        // console.log("La tasa convertida es: " + valor + "%");
    }
//    Efectiva Vencida --> Nominal Anticipada
    else if (tasaOrigen == "Efectiva" && antVenOrigen == "Vencida" && tasaDestino == "Nominal" && antVenDestino == "Anticipada") {
        valor = tasainteres + 1;
        valor = Math.pow(valor, (tiempoOrigen / tiempoDestino));
        valor = valor - 1;
        valor = valor / (1 + valor);
        valor = valor * tiempoDestino;
        valor = valor * 100;
        // console.log("La tasa convertida es: " + valor + "%");
    }
//
    else if (antVenOrigen == "Vencida" && antVenDestino == "Vencida") {
        //Nominal a Efectvia
        if (tasaOrigen == "Nominal" && tasaDestino == "Efectiva") {
            valor = tasainteres;
            valor = valor / tiempoOrigen;
            valor = valor + 1;
            valor = Math.pow(valor, (tiempoOrigen / tiempoDestino));
            valor = valor - 1;
            valor = valor * 100;
            // console.log("La tasa convertida es: " + valor + "% Efectiva" + tiempodestino + "");
        } else if (tasaOrigen == "Efectiva" && tasaDestino == "Nominal") {
            valor = tasainteres;
            valor = valor + 1;
            valor = Math.pow(valor, (tiempoOrigen / tiempoDestino));
            valor = valor - 1;
            valor = valor * tiempoDestino;
            valor = valor * 100;
            // console.log("La tasa convertida es: " + valor + "% Nominal" + tiempodestino + "");
        } else if (tasaOrigen == "Efectiva" && tasaDestino == "Efectiva") {// tener en cuenta
            valor = tasainteres;
            valor = valor + 1;
            valor = Math.pow(valor, (tiempoOrigen / tiempoDestino));
            valor = valor - 1;
            valor = valor * 100;
            // console.log("La tasa convertida es: " + valor + "% Efectiva" + tiempodestino + "");
        } else if (tasaOrigen == "Nominal" && tasaDestino == "Nominal") {
            valor = tasainteres / tiempoOrigen;
            valor = valor + 1;
            valor = Math.pow(valor, (tiempoOrigen / tiempoDestino));
            valor = valor - 1;
            valor = valor * tiempoDestino;
            valor = valor * 100;
            // console.log("La tasa convertida es: " + valor + "% Efectiva" + tiempodestino + "");
        }
    }
    // return valor
    console.log('la tasa ---->', valor)
    coreAbonos(valor, datosPrimariosEntrada, abono)
}
