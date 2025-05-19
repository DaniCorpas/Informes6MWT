//------------------------------------------------------------------------
// Funció per generar el PDF
//------------------------------------------------------------------------
function descargarInformePDF() {
    const informeElement = document.getElementById("info");

    if (!informeElement) {
        console.error("El contenedor del informe no existe.");
        return;
    }

    // Añadir la clase para aplicar los estilos del PDF
    informeElement.classList.add("pdf-style");

    // Configuración para html2pdf
    const options = {
        margin: [10, 10, 10, 10], // Márgenes en mm
        filename: nomPDF || "informe.pdf",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 }, // Escala para mejorar la calidad
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Manejo de saltos de página
    };

    // Generar y descargar el PDF
    html2pdf()
        .set(options)
        .from(informeElement)
        .save()
        .then(() => {
            // Eliminar la clase después de generar el PDF
            informeElement.classList.remove("pdf-style");
        })
        .catch(error => {
            console.error("Error al generar el PDF:", error);
            // Asegurarse de eliminar la clase en caso de error
            informeElement.classList.remove("pdf-style");
        });
}

//------------------------------------------------------------------------
// Funció per generar l'Excel
//------------------------------------------------------------------------
function descargarInformeExcel() {
    // Verificar que los datos estén disponibles
    if (!dataTest || !dataInitial || !dataFinal || !dataPascon) {
        console.error("Los datos no están completamente cargados.");
        return;
    }

    // Crear los datos para el Excel
    const datos = [
        ["Test Data"],
        ["Date", "Time", "Cone Distance", "ID", "Hash"],
        [date, time, `${dataTest.cone_distance} mts`, ID, dataTest.tid],
        [],
        ["Antropometric Values"],
        ["Name", "Gender", "Age", "Weight - Height", "IMC"],
        [nom, sexe, `${dataTest.age} y`, `${dataTest.weight} Kg - ${dataTest.height} Cms`, `${imc} Kg/m²`],
        [],
        ["Basal Values"],
        ["Spo2", "Heart Rate", "HR Percentage", "Dyspnea", "Fatigue", "O2"],
        [`${dataInitial.spo} %`, `${dataInitial.hr} ppm`, `${hrP_Basal} %`, `${dataInitial.d} Borg`, `${dataInitial.f} Borg`, `${dataTest.o2} lit.`],
        [],
        ["Final Values"],
        ["Meters", "Dyspnea", "Fatigue"],
        [`${dataFinal.meters} mts`, `${dataFinal.d} Borg`, `${dataFinal.f} Borg`],
        [],
        ["Rest Values"],
        ["Half Rest Spo2", "Half Rest HR", "Half Rest HR %", "Rest End Spo2", "Rest End HR", "Rest End HR %"],
        [`${dataFinal.half_rest_spo} %`, `${dataFinal.half_rest_hr} ppm`, `${hrP_Half_Rest} %`, `${dataFinal.end_rest_spo} %`, `${dataFinal.end_rest_hr} ppm`, `${hrP_End_Rest} %`],
        [],
        ["Computed Values"],
        ["Enright D", "Enright %", "6MW Work", "DSP", "Max Test HR", "Max Test HR %"],
        [`${enrightD} mts`, `${enrightP} %`, `${sixMWWork} mts*kg`, `${dsp} mts/min(Spo2)`, `${maxTestHR} ppm`, `${maxTestHRP} %`],
        ["Stops", "Stops Time", "Avg Spo2", "Avg HR", "Min Test Spo2", "6MW Speed"],
        [`${dataStops.length}`, `${stops_time} s`, `${avg_spo} %`, `${avg_hr} ppm`, `${min_test_spo} %`, `${sixMWSpeed} m/s`],
        [],
        ["Average Values"],
        ["Avg 1st Min", "Avg 2nd Min", "Avg 3rd Min", "Avg 4th Min", "Avg 5th Min", "Avg 6th Min"],
        [...avgSPerMinute],
        [...avgHPerMinute],
        [],
        ["Periodic Values"],
        ["Min 1", "Min 2", "Min 3", "Min 4", "Min 5", "Min 6"],
        [...periodicSValues],
        [...periodicHValues],
        [],
        ["Checkpoints"],
        ["Meters", "Time", "Heart Rate", "Saturation"],
        ...dataPascon.map((item, idx) => [
            `${(idx + 1) * dataTest.cone_distance} mts`,
            `${item.t} "`,
            `${item.h} ppm`,
            `${item.s} %`
        ])
    ];

    // Crear un libro de trabajo (workbook) y una hoja (worksheet)
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(datos); // Convertir los datos a una hoja

    // Añadir la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, "Informe");

    // Descargar el archivo Excel
    XLSX.writeFile(wb, "informe.xlsx");
}