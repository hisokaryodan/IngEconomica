function calcularCuota(vP, n, i) {
    return vP / ((1 - (Math.pow((1 + i), -n))) / i)
}

function calcularValorPresente(cuota, i, n) {
    return cuota * ((1 - (Math.pow((1 + i), -n))) / i)
}

var vP = 28000000;
var n = 72;
var i = 0.015;
var cuota = calcularCuota(vP, n, i);
var N = 61

console.log(calcularValorPresente(cuota, i, N))
