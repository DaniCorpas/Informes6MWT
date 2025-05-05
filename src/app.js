const express = require('express');
const path = require('path');
const app = express();

// Indica aquí qué JSON quieres cargar (por defecto '1')
// Puedes cambiar DATA_INDEX a '2', '3', etc., o exportar la variable antes de arrancar:
//   DATA_INDEX=2 npm run dev
const DATA_INDEX = process.env.DATA_INDEX || '1';
const dataFileName = `exemple${DATA_INDEX}.json`;
const dataFilePath = path.join(__dirname, '../public/data', dataFileName);

let jsonData;
try {
  jsonData = require(dataFilePath);
} catch (err) {
  console.error(`Error al cargar ${dataFileName}:`, err);
  process.exit(1);
}

// Ejemplo: servir una ruta que devuelva el JSON
app.get('/data', (req, res) => {
  res.json(jsonData);
});

// Resto de configuración de Express / Next.js o similar
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
  console.log(`Cargando datos desde: public/data/${dataFileName}`);
});

