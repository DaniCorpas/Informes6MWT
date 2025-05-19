//------------------------------------------------------------------------
// Funció per carregar les dades del test
//------------------------------------------------------------------------

async function loadTestData() {
    console.log("Carregant dades de:", jsonFileName); // <-- Añade esto
    try {
        const response = await fetch(`/data/${jsonFileName}`);
        if (!response.ok) {
            throw new Error('Error en carregar les dades del test');
        }
        const data = await response.json();

        // Assignem les dades a les variables globals
        dataTest = data.test;
        dataInitial = data.initial;
        dataFinal = data.final;
        dataPascon = data.pascon;
        dataStops = data.stops;
        dataData = data.data;

        // Fem els càlculs necessaris
        funcioCalculs();
        funcioAverageValues();
        funcioPeriodicValues();
        // Generar la gráfica después de cargar los datos
        generarGraficaTest();
        generarGraficaCheckpoints();

        // Renderitzem les dades
        renderData();

        console.log("Dades carregades:", data);
    } catch (error) {
        console.error('Error en carregar les dades:', error);
    }
}


//------------------------------------------------------------------------
// Funció per canviar el fitxer JSON
//------------------------------------------------------------------------
function cambiarJson(nuevoArchivo) {
    jsonFileName = nuevoArchivo;
    loadTestData();
}