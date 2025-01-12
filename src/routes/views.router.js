const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productos.json');

// Leer archivos JSON con manejo de archivos vacíos
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        return [];
    }
};

// Ruta para la página principal (home)
router.get('/', (req, res) => {
    const products = readJsonFile(productsFilePath);
    res.render('home', { products });  // 'home' es el archivo .handlebars para la página principal
});

// Ruta para la vista en tiempo real
router.get('/realtimeproducts', (req, res) => {
    const products = readJsonFile(productsFilePath);
    res.render('realTimeProducts', { products });
});

module.exports = router;
