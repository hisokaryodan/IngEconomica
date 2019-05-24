function dividirTasa(tasa) {
    return tasa / 100;
}

function getCalcularCuota(vP, n, i) {
    return vP / ((1 - (Math.pow((1 + i), -n))) / i)
}

function getCalcularValorPresente(cuota, i, n) {
    return cuota * ((1 - (Math.pow((1 + i), -n))) / i)
}

function getTotalAbono(abono, i, newVp) {
    var interesADescontar = newVp * i;

    return abono - interesADescontar;
}

function getNuevoSaldo(newVp, totalAbono) {
    return newVp - totalAbono
}

function getDisminucionTiempo(nuevoSaldo, cuota, i, mes) {
    // console.log('mes-->', mes)
    var division = ((nuevoSaldo / cuota) * i) - 1;
    // console.log('nuevo valor -->', nuevoSaldo)
    var potencia = -(1 + i);
    var logaritmoIzquierdo = Math.log((-1 * division));
    var logaritomoDerecho = Math.log((-1 * potencia));

    return (logaritmoIzquierdo / logaritomoDerecho) - mes
}

function getMesesPorPagar(n, mes, cuota = true) {
    return cuota === false ? n - (mes - 1) : n - mes;
}

/* mock datos de entrda */
var datosPrimariosEntrada = {
    'I': 1.5,
    'TipoI': 'Nominal',
    'vP': 28000000,
    'n': 72,
};

var abono = [];
abono[0] = {
    'abono': 4000000,
    'mes': 12,
    'cuota': false
};
abono[1] = {
    'abono': 3000000,
    'mes': 24,
    'cuota': true
};
abono[2] = {
    'abono': 2500000,
    'mes': 36,
    'cuota': false
};

var i = dividirTasa(datosPrimariosEntrada.I);// valor obtenido codigo brayan solo se simula division

abono.forEach(function (element, index) {
    console.log('index---->', index);
    console.log('element---->', element);
    console.log('datosPrimariosEntrada--->', datosPrimariosEntrada);

    var cuota = getCalcularCuota(datosPrimariosEntrada.vP, datosPrimariosEntrada.n, i);
    var N = getMesesPorPagar(datosPrimariosEntrada.n, element.mes);
    var newVp = getCalcularValorPresente(cuota, i, N);
    console.log('newVp--->', newVp);
    var totalAbono = getTotalAbono(element.abono, i, newVp);
    var nuevoSaldo = getNuevoSaldo(newVp, totalAbono);

    if (element.cuota == true) {
        console.log('n--->', datosPrimariosEntrada.n)
        var N = getMesesPorPagar(datosPrimariosEntrada.n, element.mes, true);
        console.log(getCalcularCuota(nuevoSaldo, N, i));
        datosPrimariosEntrada.vP = nuevoSaldo;

    } else if (element.cuota == false) {
        datosPrimariosEntrada.n = Math.abs(getDisminucionTiempo(nuevoSaldo, cuota, i, element.mes))
        console.log(datosPrimariosEntrada.n)
    }
    console.log('fin iteracion------------------------------------------>');
    // if (index == 1) {
    //     throw new Error("my error message");
    // }

});

/* flujo tiempo*/
// var i = 0.015;// valor obtenido codigo brayan
// var vP = 28000000; // valor entrada
// var n = 72; // valor de entrada
// var mes = 12; // valor de entrada
// var abono = 4000000; // valor de entrada
// var cuota = getCalcularCuota(vP, n, i);
// var N = getMesePorPagar(n, mes);
// var newVp = getCalcularValorPresente(cuota, i, N);
// console.log('newVp--->', newVp)
// var totalAbono = getTotalAbono(abono, i, newVp);
// var nuevoSaldo = getNuevoSaldo(newVp, totalAbono);


// /*flujo disminucion de cuota*/
// var i = 0.015;// valor obtenido codigo brayan
// var vP = 21785333; // valor array
// var n = 60.14; // valor de entrada
// var mes = 24; // valor de entrada
// var abono = 3000000; // valor de entrada
// var cuota = 638618.15 // tiene estar guardado en un array
// var N = getMesePorPagar(n, mes, false);
// console.log('esta monda es N--->', N)
// var newVp = getCalcularValorPresente(cuota, i, N);
// console.log('newVp--->', newVp)
// var totalAbono = getTotalAbono(abono, i, newVp);
// var nuevoSaldo = getNuevoSaldo(newVp, totalAbono);

// var N = getMesePorPagar(n, mes, true);
// // console.log(getDisminucionTiempo(nuevoSaldo, cuota, i))
// console.log(getCalcularCuota(nuevoSaldo, N, i));
