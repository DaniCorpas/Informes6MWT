// src/app.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('body-parser');
const { error } = require('console');

const app = express();
const PORT = 3000;

// 1) Servir la carpeta public per als fitxers estatics (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, '../public')));

// 2) Endpoint per retornar les dades del JSON
app.get('/api/data', (req, res) => {
    //Llegim el fitxer JSON que conté les dades del test
    fs.readFile(path.join(__dirname, '../data/example_6mwt_with_stops.json'), 'utf-8', (err, jsonString) => {
        if(err){
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'No hem pogut llegir el fitxer' });
        }
        try{
            const data = JSON.parse(jsonString);
            res.json(data); // Enviem les dades JSON al client
        } catch (parseErr){
            console.error('Error parsing JSON:', parseErr);
            return res.status(500).json({ error: 'Error de format del fitxer JSON' });
        }
    });
});

// Arrenquem el servidor 
app.listen(PORT, () => {
    console.log('Sevidor escoltant a http://localhost:${PORT}');
});