const inputPrecio = document.getElementById('precio');
const inputPrecioDolar = document.getElementById('USD');
const buttonConvertir = document.getElementById('convertir');


function redondearDecenas(num) {
    return Math.ceil(num / 10) * 10;
}

buttonConvertir.addEventListener('click', () => {
    const montoMXN = parseFloat(inputPrecio.value);

    if (!isNaN(montoMXN) && montoMXN > 0) {
        const apiURL =
            'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=9f912fa56591931586974565740924e4921c0ac488021c01b7ec9238b65077d0';

        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => {
                const tasaCambio = parseFloat(data.bmx.series[0].datos[0].dato);
                console.log('Tasa de cambio:', tasaCambio);

                const precioUSD = montoMXN / tasaCambio;
                inputPrecioDolar.value = precioUSD.toFixed(2);
            })
            .catch((error) => {
                console.error('Error al obtener la tasa de cambio:', error);
                alert('No se pudo obtener la tasa de cambio. Intenta más tarde.');
            });
    } else {
        alert('Introduce un monto válido en MXN.');
    }
});
