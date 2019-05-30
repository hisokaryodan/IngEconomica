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
    var division = ((nuevoSaldo / cuota) * i) - 1;
    var potencia = -(1 + i);
    var logaritmoIzquierdo = Math.log((-1 * division));
    var logaritomoDerecho = Math.log((-1 * potencia));

    return (logaritmoIzquierdo / logaritomoDerecho) - mes
}

function getMesesPorPagar(n, mes, cuota = true) {
    return cuota == false ? n - (mes - 1) : n - mes;
}

function coreAbonos(i, datosPrimariosEntrada, abono) {
    var i = dividirTasa(i);// valor obtenido codigo brayan solo se simula division
    var cuota = getCalcularCuota(datosPrimariosEntrada.vP, datosPrimariosEntrada.n, i);

    abono.forEach(function (element, index) {
        console.log('index---->', index);
        console.log('element---->', element);
        console.log('datosPrimariosEntrada--->', datosPrimariosEntrada);

        // console.log('valores calcular cuota--->', datosPrimariosEntrada.vP, datosPrimariosEntrada.n, i)
        // var cuota = getCalcularCuota(datosPrimariosEntrada.vP, datosPrimariosEntrada.n, i);
        console.log('cuota--->', cuota);
        (element.cuota === "true") ? element.cuota = true : element.cuota = false;
        var N = getMesesPorPagar(datosPrimariosEntrada.n, element.mes, element.cuota);
        console.log('MesesPorPagar---->', N);
        var newVp = getCalcularValorPresente(cuota, i, N);
        console.log('newVp--->', newVp);
        var totalAbono = getTotalAbono(element.abono, i, newVp);
        console.log('totalAbono-->', totalAbono)
        var nuevoSaldo = getNuevoSaldo(newVp, totalAbono);
        console.log('nuevoSaldo-->', nuevoSaldo)

        if (element.cuota === true) {
            console.log('n--->', datosPrimariosEntrada.n)
            var N = getMesesPorPagar(datosPrimariosEntrada.n, element.mes, true);
            console.log('N--->', N)
            console.log('data de getCalcularCuota--->', nuevoSaldo, N, i)
            cuota = getCalcularCuota(nuevoSaldo, N, i)
            console.log('getCalcularCuota--->', cuota);
            datosPrimariosEntrada.vP = nuevoSaldo;

        } else if (element.cuota === false) {
            // console.log('tomalo')
            datosPrimariosEntrada.n = Math.abs(getDisminucionTiempo(nuevoSaldo, cuota, i, element.mes))
            console.log('datosPrimariosEntrada.n---->', datosPrimariosEntrada.n)
            datosPrimariosEntrada.vP = nuevoSaldo;
        }
        console.log('fin iteracion------------------------------------------>');
        // var elementId = 'resultValor' + index + 1
        var suma = parseInt(index) + parseInt(1)
        var valorId = "resultValor" + suma
        console.log(valorId)
        var cuotaId = "resultCuota" + suma
        document.getElementById(valorId).innerHTML = '<h2><p> Valor Presente con abono numero' + suma + ' $' + nuevoSaldo + '</p></h2>';
        document.getElementById(cuotaId).innerHTML = '<h2><p> Valor de la Cuota con abono numero' + suma + ' $' + cuota + '</p></h2>';
    });
}
