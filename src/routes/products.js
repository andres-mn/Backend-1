const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();
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

// Guardar archivos JSON
const saveJsonFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Función para generar un ID único
const generateId = (data) => {
    return data.length ? data[data.length - 1].id + 1 : 1;
};

// Ruta para listar todos los productos con limitación opcional
router.get('/', (req, res) => {
    const products = readJsonFile(productsFilePath);
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const products = readJsonFile(productsFilePath);
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

    if (!title || !description || !code || !price || typeof status !== 'boolean' || !stock || !category) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios, excepto thumbnails' });
    }

    const newProduct = {
        id: generateId(products),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    products.push(newProduct);
    saveJsonFile(productsFilePath, products);

    // Emitir el evento 'productAdded' para notificar al cliente
    req.io.emit('productAdded', newProduct);

    res.status(201).json(newProduct);
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', (req, res) => {
    const products = readJsonFile(productsFilePath);
    const pid = parseInt(req.params.pid);
    const productIndex = products.findIndex(p => p.id === pid);

    if (productIndex === -1) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    const removedProduct = products.splice(productIndex, 1)[0];
    saveJsonFile(productsFilePath, products);

    // Emitir el evento 'productRemoved' para notificar al cliente
    req.io.emit('productRemoved', removedProduct);

    res.status(204).send();
});

module.exports = router;
