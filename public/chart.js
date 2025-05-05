// filepath: /home/dani/Escritorio/TFG/public/chart.js
// Función para generar una gráfica utilizando Chart.js

let chartInstance = null; // Variable global para guardar la instancia
let chartCheckpointsInstance = null;

function generarGraficaTest() {
    const ctx = document.getElementById('graficaTest').getContext('2d');

    if (!dataData || dataData.length === 0) {
        console.error('No hay datos disponibles para generar la gráfica.');
        return;
    }

    if (chartInstance) {
        chartInstance.destroy();
    }

    const tiempos = dataData.map(item => item.t);
    const saturaciones = dataData.map(item => item.s);
    const frecuencias = dataData.map(item => item.h);

    // Prepara los intervalos de stops (inicio y fin)
    const stopsIntervals = (dataStops || []).map(stop => ({
        start: stop.time,
        end: stop.time + stop.len
    }));

    // Función para saber si un tiempo está en un stop
    function isInStop(t) {
        return stopsIntervals.some(interval => t >= interval.start && t <= interval.end);
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tiempos,
            datasets: [
                {
                    label: 'Saturación (%)',
                    data: saturaciones,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0,
                    segment: {
                        borderColor: ctx => {
                            const t = tiempos[ctx.p0DataIndex];
                            return isInStop(t) ? '#39FF14' : 'rgba(75, 192, 192, 1)';
                        },
                        borderWidth: ctx => {
                            const t = tiempos[ctx.p0DataIndex];
                            return (t < 0 || t > 360) ? 1 : 3;
                        }
                    }
                },
                {
                    label: 'Frecuencia Cardíaca (ppm)',
                    data: frecuencias,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0,
                    segment: {
                        borderColor: ctx => {
                            const t = tiempos[ctx.p0DataIndex];
                            return isInStop(t) ? '#39FF14' : 'rgba(255, 99, 132, 1)';
                        },
                        borderWidth: ctx => {
                            const t = tiempos[ctx.p0DataIndex];
                            return (t < 0 || t > 360) ? 1 : 3;
                        }
                    }
                },
                {
                    label: 'Stops',
                    data: [],
                    borderColor: '#39FF14',
                    backgroundColor: 'rgba(57, 255, 20, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 0,
                    segment: {
                        borderColor: '#39FF14',
                        borderWidth: 3,
                    },
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Test Data (h y s)',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            // Puedes personalizar el tooltip si quieres indicar si es un stop
                            const t = context.label;
                            if (isInStop(t)) {
                                return context.dataset.label + ': ' + context.formattedValue + ' (STOP)';
                            }
                            return context.dataset.label + ': ' + context.formattedValue;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Temps (segons)',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor',
                    },
                },
            },
        },
    });
}

function generarGraficaCheckpoints() {
    const ctx = document.getElementById('graficaCheckpoints').getContext('2d');

    if (!dataPascon || dataPascon.length === 0 || !dataData) {
        console.error('No hay datos de checkpoints o datos de prueba para la gráfica.');
        return;
    }

    if (chartCheckpointsInstance) {
        chartCheckpointsInstance.destroy();
    }

    // Obtener el mínimo y máximo segundo de la prueba
    const minTiempo = Math.min(...dataData.map(item => item.t));
    const maxTiempo = Math.max(...dataData.map(item => item.t));
    // Crear un array con todos los segundos de la prueba, incluyendo negativos
    const todosLosSegundos = Array.from({length: maxTiempo - minTiempo + 1}, (_, i) => minTiempo + i);

    // Crear un mapa para acceso rápido por segundo
    const pasconPorSegundo = {};
    dataPascon.forEach(item => {
        pasconPorSegundo[item.t] = item;
    });

    // Rellenar los arrays de datos, poniendo null donde no hay checkpoint
    const saturaciones = todosLosSegundos.map(seg => pasconPorSegundo[seg] ? pasconPorSegundo[seg].s : null);
    const frecuencias = todosLosSegundos.map(seg => pasconPorSegundo[seg] ? pasconPorSegundo[seg].h : null);

    chartCheckpointsInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: todosLosSegundos,
            datasets: [
                {
                    label: 'Saturación (%)',
                    data: saturaciones,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    spanGaps: true,
                    pointRadius: 4,
                },
                {
                    label: 'Frecuencia Cardíaca (ppm)',
                    data: frecuencias,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    spanGaps: true,
                    pointRadius: 4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Checkpoints por segundo (h y s)',
                },
            },
            scales: {
                x: { title: { display: true, text: 'Segundos' }, },
                y: { title: { display: true, text: 'Valor' } },
            },
        },
    });
}
