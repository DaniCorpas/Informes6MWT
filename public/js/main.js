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
                        <th>Date</th>
                        <th>Time</th>
                        <th>Cone distance</th>
                        <th>ID</th>
                        <th>Hash</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${date}</td>
                        <td>${time}</td>
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
                        <th>Name</th>
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
                        <td>${dataTest.weight} Kg - ${dataTest.height} Cms</td>
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
                        ${(!dataStops || dataStops.length === 0)
                            ? `<td colspan="2">No s'ha fet cap aturada</td>
                               <td>${avg_spo} %</td>
                               <td>${avg_hr} ppm</td>
                               <td>${min_test_spo} %</td>
                               <td>${sixMWSpeed} m/s</td>`
                            : `<td>${funcioStops()}</td>
                               <td>${stops_time} s</td>
                               <td>${avg_spo} %</td>
                               <td>${avg_hr} ppm</td>
                               <td>${min_test_spo} %</td>
                               <td>${sixMWSpeed} m/s</td>`
                        }
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
                    ${dataPascon.map((item, idx) => `
                        <tr>
                            <td>${(idx + 1) * dataTest.cone_distance} mts</td>
                            <td>${item.t} "</td>
                            <td>${item.h} ppm</td>
                            <td>${item.s} %</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    div.innerHTML = html;

    // Enable drag and drop functionality
    enableDragAndDrop();
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


// ------------------------------------------------------------------
// Listener pel botó de descarregar PDF
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Cuando se cargue todo, vinculamos el botón con id="downloadPDFBtn"
    const downloadBtn = document.getElementById("btnPDF");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", descargarInformePDF);
    }

    // Botón para generar el Excel
    const downloadExcelBtn = document.getElementById("btnExcel");
    if (downloadExcelBtn) {
        downloadExcelBtn.addEventListener("click", descargarInformeExcel);
    }

    const selector = document.getElementById('selectorJson');
    if (selector) {
        selector.addEventListener('change', function() {
            console.log("Cambiando a:", this.value); // <-- Añade esto
            cambiarJson(this.value);
        });
    }
});

//------------------------------------------------------------------------
// Funció per inicialitzar l'aplicació
//------------------------------------------------------------------------
loadTestData();





