// 

// Declaració de variables per les dades del test
let dataTest = null;
let dataInitial = null;
let dataFinal = null;
let dataPascon = [];
let dataStops = [];
let dataData = [];

// Declaració de les dades Hardcoded
const ID = 225;
const nom = "AAAA";
const sexe = "Female";

// Declaració de les dades pels càlculs
let imc = 0;
let hrP_Basal = 0;
let hrP_Half_Rest = 0;
let hrP_End_Rest = 0;
let enrightD = 0;
let enrightP = 0;
let sixMWWork = 0;
let dsp = 0;
let maxTestHR = 0;
let maxTestHRP = 0;
let stops_time = 0;
let avg_spo = 0;
let avg_hr = 0;
let min_test_spo = 0;
let sixMWSpeed = 0;
let avgSPerMinute = []; // Array per guardar els valors mitjans de cada minut
let avgHPerMinute = []; // Array per guardar els valors mitjans de cada minut
let periodicSValues = []; // Array per guardar els valors periòdics
let periodicHValues = []; // Array per guardar els valors periòdics

//------------------------------------------------------------------------
// Funció per carregar les dades del test
//------------------------------------------------------------------------

async function loadTestData() {
    try {
        // Fem una petició fetch a l'endpoint que hem creat
        const response = await fetch('/api/data');
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

        // Renderitzem les dades
        renderData();

        console.log("Dades carregades:", data);
    } catch (error) {
        console.error('Error en carregar les dades:', error);
    }
}

//------------------------------------------------------------------------
// Funció de renderització de les dades
//------------------------------------------------------------------------

function renderData() {

    const div = document.getElementById('info');
    let html = "";

    // (1) Bloc Test
    html += `
        <div class="data-table" id="dragTest" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="test-table">-</button>
                </div>

                <div class="header-center">
                    <h3 class="table-title">Test</h3>
                </div>

                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="test-table">
                <thead>
                    <tr>
                        <th>Date:</th>
                        <th>Time:</th>
                        <th>Cone distance</th>
                        <th>ID</th>
                        <th>Hash</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${dataTest.date}</td>
                        <td>${dataTest.date}</td>
                        <td>${dataTest.cone_distance} mts</td>
                        <td>${ID}</td>
                        <td>${dataTest.tid}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // (2) Bloc Antropometic Values
    html += `
        <div class="data-table" id="dragAntropometric" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="antropometric-table">-</button>
                </div>

                <div class="header-center">
                    <h3 class="table-title">Antropometric values</h3>
                </div>

                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="antropometric-table">
                <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Weight - Height</th>
                        <th>IMC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${nom}</td>
                        <td>${sexe}</td>
                        <td>${dataTest.age} y</td>
                        <td>${dataTest.weight} Kg- ${dataTest.height} Cms</td>
                        <td>${imc} Kg/m<sup>2</sup></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // (3) Bloc Comments
    html += `
        <div class="data-table" id="dragComments" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="comments-table">-</button>
                </div>

                <div class="header-center">
                    <h3 class="table-title">Comments</h3>
                </div>

                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="comments-table">
                <body>
                    ${funcioGeneraComentaris()}
                </body>
            </table>
        </div>
    `;

    // (4) Bloc Basal Values
    html += `
        <div class="data-table"  id="dragBasal" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="basal-table">-</button>
                </div>
                <div class="header-center">
                    <h3 class="table-title">Basal values</h3>
                </div>
                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="basal-table">
                <thead>
                    <tr>
                        <th>Spo<sub>2</sub></th>
                        <th>Heart rate</th>
                        <th>HR percentage</th>
                        <th>Dyspnea</th>
                        <th>Fatigue</th>
                        <th>O<sub>2</sub></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${dataInitial.spo} %</td>
                        <td>${dataInitial.hr} ppm</td>
                        <td>${hrP_Basal} %</td> 
                        <td>${dataInitial.d} Borg</td>
                        <td>${dataInitial.f} Borg</td>
                        <td>${dataTest.o2} lit.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // (5) Bloc Final Values
    html += `
        <div class="data-table"  id="dragFinal" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="final-table">-</button>
                </div>
                <div class="header-center">
                    <h3 class="table-title">Final values</h3>
                </div>
                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="final-table">
                <thead>
                    <tr>
                        <th>Meters</th>
                        <th>Dyspnea</th>
                        <th>Fatigue</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${dataFinal.meters} mts</td>
                        <td>${dataFinal.d} Borg</td>
                        <td>${dataFinal.f} Borg</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // (6) Bloc Rest Values
    html += `
        <div class="data-table" id="dragRest" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="rest-table">-</button>
                </div>
                <div class="header-center">
                    <h3 class="table-title">Rest values</h3>
                </div>
                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="rest-table">
                <thead>
                    <tr>
                        <th>Half rest Sp0<sub>2</sub></th>
                        <th>Half rest HR</th>
                        <th>Half rest HR %</th>
                        <th>Rest end Spo<sub>2</sub></th>
                        <th>Rest end HR</th>
                        <th>Rest end HR %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${dataFinal.half_rest_spo} %</td>
                        <td>${dataFinal.half_rest_hr} ppm</td>
                        <td>${hrP_Half_Rest} %</td>
                        <td>${dataFinal.end_rest_spo} %</td>
                        <td>${dataFinal.end_rest_hr} ppm</td>
                        <td>${hrP_End_Rest} %</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // (7) Bloc Computed values
    html += `
        <div class="data-table" id="dragComputed" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="computed-table">-</button>
                </div>
                <div class="header-center">
                    <h3 class="table-title">Computed values</h3>
                </div>
                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="computed-table">
                <thead>
                    <tr>
                        <th>Enright D</th>
                        <th>Enright %</th>
                        <th>6MW Work</th>
                        <th>DSP</th>
                        <th>Max test HR</th>
                        <th>Max test HR %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${enrightD} mts</td>
                        <td>${enrightP} %</td>
                        <td>${sixMWWork} mts*kg</td>
                        <td>${dsp} mts/min(Spo<sub>2</sub>)</td>
                        <td>${maxTestHR} ppm</td>
                        <td>${maxTestHRP} %</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>Stops</th>
                        <th>Stops time</th>
                        <th>Avg Spo<sub>2</sub></th>
                        <th>Avg HR</th>
                        <th>Min test Spo<sub>2</sub></th>
                        <th>6MW Speed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        ${funcioStops()}
                        <td>${stops_time}</td>
                        <td>${avg_spo} %</td>
                        <td>${avg_hr} ppm</td>
                        <td>${min_test_spo} %</td>
                        <td>${sixMWSpeed} m/s</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // (8) Bloc Average values
    html += `
        <div class="data-table" id="dragAverage" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="average-table">-</button>
                </div>
                <div class="header-center">
                    <h3 class="table-title">Average values</h3>
                </div>
                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="average-table">
                <thead>
                    <tr>
                        <th>Avg 1st min</th>
                        <th>Avg 2nd min</th>
                        <th>Avg 3rd min</th>
                        <th>Avg 4th min</th>
                        <th>Avg 5th min</th>
                        <th>Avg 6th min</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${avgSPerMinute[0]} %</td>
                        <td>${avgSPerMinute[1]} %</td>
                        <td>${avgSPerMinute[2]} %</td>
                        <td>${avgSPerMinute[3]} %</td>
                        <td>${avgSPerMinute[4]} %</td>
                        <td>${avgSPerMinute[5]} %</td>
                    </tr>
                    <tr>
                        <td>${avgHPerMinute[0]} ppm</td>
                        <td>${avgHPerMinute[1]} ppm</td>
                        <td>${avgHPerMinute[2]} ppm</td>
                        <td>${avgHPerMinute[3]} ppm</td>
                        <td>${avgHPerMinute[4]} ppm</td>
                        <td>${avgHPerMinute[5]} ppm</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // (9) Bloc Periodic values
    html += `
        <div class="data-table" id="dragPeriodic" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="periodic-table">-</button>
                </div>
                <div class="header-center">
                    <h3 class="table-title">Periodic values</h3>
                </div>
                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="periodic-table">
                <thead>
                    <tr>
                        <th>Min 1</th>
                        <th>Min 2</th>
                        <th>Min 3</th>
                        <th>Min 4</th>
                        <th>Min 5</th>
                        <th>Min 6</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${periodicSValues[0]} %</td>
                        <td>${periodicSValues[1]} %</td>
                        <td>${periodicSValues[2]} %</td>
                        <td>${periodicSValues[3]} %</td>
                        <td>${periodicSValues[4]} %</td>
                        <td>${periodicSValues[5]} %</td>
                    </tr>
                    <tr>
                        <td>${periodicHValues[0]} ppm</td>
                        <td>${periodicHValues[1]} ppm</td>
                        <td>${periodicHValues[2]} ppm</td>
                        <td>${periodicHValues[3]} ppm</td>
                        <td>${periodicHValues[4]} ppm</td>
                        <td>${periodicHValues[5]} ppm</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // (10) Bloc Checkpoints
    html += `
        <div class="data-table" id="dragCheckpoints" draggable="true">
            <div class="table-header">
                <div class="header-left">
                    <button type="button" class="toggle-button" data-target="checkpoints-table">-</button>
                </div>
                <div class="header-center">
                    <h3 class="table-title">Checkpoints</h3>
                </div>
                <div class="header-right">
                    <!-- De momento vacío -->
                </div>
            </div>
            <table id="checkpoints-table">
                <thead>
                    <tr>
                        <th>Meters</th>
                        <th>Time</th>
                        <th>Heart rate</th>
                        <th>Saturation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${(dataPascon[0].n + 1) * 30} mts</td>
                        <td>${dataPascon[0].t} "</td>
                        <td>${dataPascon[0].h} ppm</td>
                        <td>${dataPascon[0].s} %</td>
                    </tr>
                    <tr>
                        <td>${(dataPascon[1].n + 1) * 30} mts</td>
                        <td>${dataPascon[1].t} "</td>
                        <td>${dataPascon[1].h} ppm</td>
                        <td>${dataPascon[1].s} %</td>
                    </tr>
                    <tr>
                        <td>${(dataPascon[2].n + 1) * 30} mts</td>
                        <td>${dataPascon[2].t} "</td>
                        <td>${dataPascon[2].h} ppm</td>
                        <td>${dataPascon[2].s} %</td>
                    </tr>
                    <tr>
                        <td>${(dataPascon[3].n + 1) * 30} mts</td>
                        <td>${dataPascon[3].t} "</td>
                        <td>${dataPascon[3].h} ppm</td>
                        <td>${dataPascon[3].s} %</td>
                    </tr>
                    <tr>
                        <td>${(dataPascon[4].n + 1) * 30} mts</td>
                        <td>${dataPascon[4].t} "</td>
                        <td>${dataPascon[4].h} ppm</td>
                        <td>${dataPascon[4].s} %</td>
                    </tr>
                    <tr>
                        <td>${(dataPascon[5].n + 1) * 30} mts</td>
                        <td>${dataPascon[5].t} "</td>
                        <td>${dataPascon[5].h} ppm</td>
                        <td>${dataPascon[5].s} %</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    div.innerHTML = html;

    // Enable drag and drop functionality
    enableDragAndDrop();
}

//------------------------------------------------------------------------
// Funció per fer els càlculs
//------------------------------------------------------------------------

function funcioCalculs() {
    // Fem els càlculs necessaris
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
    dsp = dataFinal.meters * (min_test_spo / 100); // Càlcul de la DSP

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
    sixMWSpeed = dataFinal.meters / 360; // Càlcul de la velocitat


}   

//------------------------------------------------------------------------
// Funció per gestionar el clic a les taules
//------------------------------------------------------------------------

document.addEventListener('click', (event) => {
    if (event.target.matches('.toggle-button')) {
        const targetId = event.target.getAttribute('data-target');
        const tableElement = document.getElementById(targetId);
        if (!tableElement) return;

        tableElement.classList.toggle('hidden');
        if (tableElement.classList.contains('hidden')) {
            event.target.textContent = '+';
        } else {
            event.target.textContent = '-';
        }
    }
});

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

//------------------------------------------------------------------------
// Funcio per generar els stops de computed values
//------------------------------------------------------------------------

function funcioStops() {
    if (!dataStops || dataStops.length === 0) {
        return `<tr><td colspan="2">No s'ha fet cap aturada</td></tr>`;
    }

    // Concatenamos todos los comentarios en un único string
    const stops = dataStops
        .map(dataStop => `${dataStop.time}" with duration: ${dataStop.len}"`)
        .join('<br>');

    // Retornamos una única fila con una celda que ocupa todas las columnas
    return `<td>${stops}</td>`; // colspan ajustado al número de columnas
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

//------------------------------------------------------------------------
// Funció per poder fer drag and drop 
//------------------------------------------------------------------------
function enableDragAndDrop() {
    const blocks = document.querySelectorAll('.data-table');

    blocks.forEach(block => {
        block.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
            event.target.classList.add('dragging');
        });

        block.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging');
        });

        block.addEventListener('dragover', (event) => {
            event.preventDefault(); // Permitir el drop
            const draggingBlock = document.querySelector('.dragging');
            const container = event.target.closest('.data-table');
            if (container && container !== draggingBlock) {
                const bounding = container.getBoundingClientRect();
                const offset = event.clientY - bounding.top;
                if (offset > bounding.height / 2) {
                    container.parentNode.insertBefore(draggingBlock, container.nextSibling);
                } else {
                    container.parentNode.insertBefore(draggingBlock, container);
                }
            }
        });

        block.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggedBlockId = event.dataTransfer.getData('text/plain');
            const draggedBlock = document.getElementById(draggedBlockId);
            const dropTarget = event.target.closest('.data-table');
            if (dropTarget && draggedBlock) {
                dropTarget.parentNode.insertBefore(draggedBlock, dropTarget.nextSibling);
            }
        });
    });
}

//------------------------------------------------------------------------
// Funció per inicialitzar l'aplicació
//------------------------------------------------------------------------
loadTestData();