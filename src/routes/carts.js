const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();

const cartsFilePath = path.join(__dirname, '../data/carrito.json');
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

// Ruta para listar todos los carritos
router.get('/', (req, res) => {
    const carts = readJsonFile(cartsFilePath);
    res.json(carts);
});

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    const carts = readJsonFile(cartsFilePath);
    const newCart = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products: []
    };

    carts.push(newCart);
    saveJsonFile(cartsFilePath, carts);
    res.status(201).json(newCart);
});

// Ruta para listar productos de un carrito por su ID
router.get('/:cid', (req, res) => {
    const carts = readJsonFile(cartsFilePath);
    const cart = carts.find(c => c.id == req.params.cid);

    if (!cart) {
        return res.status(404).send({ error: 'Carrito no encontrado' });
    }

    res.json(cart.products);
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/products/:pid', (req, res) => {
    const carts = readJsonFile(cartsFilePath);
    const products = readJsonFile(productsFilePath);

    const cart = carts.find(c => c.id == req.params.cid);
    if (!cart) {
        return res.status(404).send({ error: 'Carrito no encontrado' });
    }

    const product = products.find(p => p.id == req.params.pid);
    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    const cartProduct = cart.products.find(p => p.product == req.params.pid);
    if (cartProduct) {
        cartProduct.quantity += 1;
    } else {
        cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    saveJsonFile(cartsFilePath, carts);
    res.status(201).json(cart);
});

module.exports = router;
