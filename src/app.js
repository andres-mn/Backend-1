const express = require('express');
const logger = require('morgan');
const path = require('path');
const fs = require('fs'); // Agrega esto
const http = require('http');
const socketIo = require('socket.io');

const productRouter = require('./routes/products.js');
const cartRouter = require('./routes/carts');
const viewsRouter = require('./routes/views.router.js');
const uploader = require('./ultis/multer.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 8080;

// Ruta del archivo productos.json
const productosPath = path.join(__dirname, 'data/productos.json');

// Función para leer productos desde el archivo JSON
const getProductos = () => {
    const data = fs.readFileSync(productosPath, 'utf-8');
    return JSON.parse(data);
};

// Middleware para socket.io
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Configuración del motor de plantillas
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));  // Sirviendo archivos estáticos desde la carpeta 'public'

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Endpoint para subir archivos
app.post('/subirarchivo', uploader.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }
    res.status(200).send(`Archivo subido con éxito: ${req.file.filename}`);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Configuración de socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');
    
    // Emitir la lista de productos cuando un usuario se conecta
    socket.emit('updateProducts', getProductos());

    // Puedes agregar más lógica aquí para actualizar productos en tiempo real
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
