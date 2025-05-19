//------------------------------------------------------------------------
// Fitxer de constants per a la generació del informe del test de 6MWT
//------------------------------------------------------------------------

// Declaració de variables per les dades del test
let dataTest = null;
let dataInitial = null;
let dataFinal = null;
let dataPascon = [];
let dataStops = [];
let dataData = [];
let nomPDF = '6MWT_informe.pdf'; // Nom del PDF generat
let jsonFileName = "exemple1.json"; // Nombre por defecto

// Declaració de les dades Hardcoded
const ID = 225;
const nom = "AAAA";
let sexe = "Female";

// Declaració de les dades pels càlculs
let [date, time] = [null, null];
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