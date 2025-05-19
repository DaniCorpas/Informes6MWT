//------------------------------------------------------------------------
// Funcio per generar els stops de computed values
//------------------------------------------------------------------------

function funcioStops() {
    if (!dataStops || dataStops.length === 0) {
        return ""; // No devuelve nada, el mensaje ya se pone en el render
    }
    // Concatenar los comentarios de las paradas
    return dataStops
        .map(dataStop => `${dataStop.time}" with duration: ${dataStop.len}"`)
        .join('<br>');
}
