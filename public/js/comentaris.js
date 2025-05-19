//------------------------------------------------------------------------
// Funcio per generar els comentaris dels stops
//------------------------------------------------------------------------

function funcioGeneraComentaris() {
    if (!dataStops || dataStops.length === 0) {
        return `<tr><td colspan="100%">No s'ha fet cap aturada</td></tr>`;
    }

    const reverseDataStops = [...dataStops].reverse(); // Invertim l'ordre de les dades

    // Concatenamos todos los comentarios en un único string
    const comments = reverseDataStops
        .map(dataStop => `Parada en segundo: ${dataStop.time}", duracion: ${dataStop.len}"`)
        .join('<br>');

    // Retornamos una única fila con una celda que ocupa todas las columnas
    return `<tr><td colspan="100%">${comments}</td></tr>`; // colspan ajustado al número de columnas
}