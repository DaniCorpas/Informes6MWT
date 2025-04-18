// filepath: /home/dani/Escritorio/TFG/public/chart.js
// Función para generar una gráfica utilizando Chart.js

function generarGrafica() {
    const ctx = document.getElementById('grafica').getContext('2d');

    // Verificar si los datos están disponibles
    if (!dataData || dataData.length === 0) {
        console.error('No hay datos disponibles para generar la gráfica.');
        return;
    }

    // Extraer los datos de tiempo, saturación y frecuencia cardíaca
    const tiempos = dataData.map(item => item.t);
    const saturaciones = dataData.map(item => item.s);
    const frecuencias = dataData.map(item => item.h);

    // Crear la gráfica
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: tiempos,
            datasets: [
                {
                    label: 'Saturación (%)',
                    data: saturaciones,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                },
                {
                    label: 'Frecuencia Cardíaca (ppm)',
                    data: frecuencias,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
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
                    text: 'Gráfica de Saturación y Frecuencia Cardíaca',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo (segundos)',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valores',
                    },
                },
            },
        },
    });
}

// Listener para cargar la gráfica al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const graficaContainer = document.getElementById('graficaContainer');
    if (graficaContainer) {
        graficaContainer.innerHTML = '<canvas id="grafica"></canvas>';
        generarGrafica();
    }
});