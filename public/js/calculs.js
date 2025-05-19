//------------------------------------------------------------------------
// Funció per fer els càlculs
//------------------------------------------------------------------------

function funcioCalculs() {
    // Fem els càlculs necessaris

    if (dataTest.gender) {
        sexe = dataTest.gender
    } else {
        sexe = "Female";
    }

    //Formategem la data i l'hora
    [date, time] = dataTest.date.split("T");
    time = time.split(".")[0]; // Agafem només la part de l'hora

    // Càlcul del IMC
    const heightMts = dataTest.height / 100;     // Convertim el height a metres
    const calculImc = dataTest.weight / (heightMts * heightMts);   // Càlcul del IMC 
    imc = parseFloat(calculImc.toFixed(1));    // Arrodonim a 1 decimal

    // Càlcul HR Basal
    const calculHr = dataInitial.hr / (220 - dataTest.age); // Càlcul de la freqüència cardíaca
    hrP_Basal = parseFloat((calculHr * 100).toFixed(1)); // Arrodonim a 1 decimal

    // Càlcul HR Mitja Repòs
    const calculHrHalf = dataFinal.half_rest_hr / (220 - dataTest.age); // Càlcul de la freqüència cardíaca
    hrP_Half_Rest = parseFloat((calculHrHalf * 100).toFixed(1)); // Arrodonim a 1 decimal

    // Càlcul HR Final Repòs
    const calculHrEnd = dataFinal.end_rest_hr / (220 - dataTest.age); // Càlcul de la freqüència cardíaca
    hrP_End_Rest = parseFloat((calculHrEnd * 100).toFixed(1)); // Arrodonim a 1 decimal

    // Càlcul Enright D
    if(sexe === "Female"){
        const calculEnrightD = (2.11 * dataTest.height) - (2.29 * dataTest.weight) - (5.78 * dataTest.age) + 667;
        enrightD = parseFloat(calculEnrightD.toFixed(1)); // Arrodonim a 1 decimal
    } else if (sexe === "Male"){
        const calculEnrightD = (7.57 * dataTest.height) - (5.02 * dataTest.weight) - (1.76 * dataTest.age) + 309;
        enrightD = parseFloat(calculEnrightD.toFixed(1)); // Arrodonim a 1 decimal
    }

    // Càlcul Enright %
    const calculEnrightP = (dataFinal.meters / enrightD) * 100; // Càlcul del percentatge
    enrightP = parseFloat(calculEnrightP.toFixed(1)); // Arrodonim a 1 decimal

    // Càlcul 6MW Work
    const calcul6MWWork = dataFinal.meters * dataTest.weight; // Càlcul del treball
    sixMWWork = parseFloat(calcul6MWWork.toFixed(1)); // Arrodonim a 1 decimal

    // Càlcul del min Spo2 en data
    min_test_spo = (Math.min(...dataData.map(item => item.s)));

    // Càlcul DSP
    dsp = parseFloat((dataFinal.meters * (min_test_spo / 100)).toFixed(1)); // Càlcul de la DSP

    // Càlcul Max Test HR
    const calculMaxTestHR = (Math.max(...dataData.map(item => item.h)));
    maxTestHR = parseFloat(calculMaxTestHR.toFixed(1)); // Arrodonim a 1 decimal

    // Càlcul Max Test HR %
    const calculMaxTestHRP = maxTestHR / (220 - dataTest.age); // Càlcul del percentatge
    maxTestHRP = parseFloat((calculMaxTestHRP * 100).toFixed(1)); // Percentatge de la freqüència cardíaca

    // Sumatori de les aturades
    stops_time = dataStops.reduce((sum, stop) => sum + stop.len, 0);

    // Càlcul de la mitjana de Spo2
    const filteredData = dataData.filter(item => item.t >= 0 && item.t <= 359);
    const calculAvg_spo = filteredData.length > 0 
        ? filteredData.reduce((sum, item) => sum + item.s, 0) / filteredData.length 
        : 0;
    avg_spo = parseFloat(calculAvg_spo.toFixed(1)); // Arrodonim a 1 decimal

    // Càlcul de la mitjana de HR
    const calculAvg_hr = filteredData.length > 0 
        ? filteredData.reduce((sum, item) => sum + item.h, 0) / filteredData.length 
        : 0;
    avg_hr = parseFloat(calculAvg_hr.toFixed(1)); // Arrodonim a 1 decimal

    // Càlcul de la velocitat 6MW
    sixMWSpeed = parseFloat((dataFinal.meters / 360).toFixed(1)); // Càlcul de la velocitat


}

//------------------------------------------------------------------------
// Funció per calcular els average values
//------------------------------------------------------------------------
function funcioAverageValues() {
    avgSPerMinute = []; // Reiniciar el array para evitar duplicados

    // Iterar por cada minuto (1 a 360 dividido en intervalos de 60 segundos)
    for (let minute = 0; minute < 6; minute++) {
        // Filtrar los datos para el intervalo de tiempo actual (1 a 360)
        const filteredData = dataData.filter(item => 
            item.t >= minute * 60 && item.t < (minute + 1) * 60
        );

        // Calcular el promedio de 's' para este intervalo
        const avgS = filteredData.length > 0
            ? filteredData.reduce((sum, item) => sum + item.s, 0) / filteredData.length
            : 0;
        
        // Calcular el promedio de 's' para este intervalo
        const avgH = filteredData.length > 0
            ? filteredData.reduce((sum, item) => sum + item.h, 0) / filteredData.length
            : 0;

        // Guardar el promedio en el array
        avgSPerMinute.push(parseFloat(avgS.toFixed(1))); // Redondear a 1 decimal
        avgHPerMinute.push(Math.round(avgH)); 
    }
}

//------------------------------------------------------------------------
// Funció per calcular els periodic values
//------------------------------------------------------------------------
function funcioPeriodicValues() {
    periodicSValues = []; // Reiniciar el array para los valores periódicos de 's'
    periodicHValues = []; // Reiniciar el array para los valores periódicos de 'h'

    // Tiempos periódicos que queremos buscar
    const periodicTimes = [59, 119, 179, 239, 299, 359];

    // Iterar por cada tiempo periódico
    periodicTimes.forEach(targetTime => {
        // Filtrar los datos que tienen t <= targetTime
        const filteredData = dataData.filter(item => item.t <= targetTime);

        if (filteredData.length > 0) {
            // Obtener el último elemento (el más cercano a targetTime)
            const closestData = filteredData[filteredData.length - 1];
            periodicSValues.push(closestData.s); // Guardar el valor de 's'
            periodicHValues.push(closestData.h); // Guardar el valor de 'h'
        } else {
            // Si no hay datos anteriores, agregar valores nulos o predeterminados
            periodicSValues.push(null);
            periodicHValues.push(null);
        }
    });
}
