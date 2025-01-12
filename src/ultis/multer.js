const multer = require("multer");
const { dirname, join } = require("node:path");

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(dirname(dirname(__dirname)), "public", "image")); // Ruta de destino
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para el archivo
    }
});

// Crear el uploader
const uploader = multer({ storage });

// Exportar uploader como predeterminado
module.exports = uploader;
