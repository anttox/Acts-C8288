const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Ruta archivos estaticos en public
app.use(express.static(path.join(__dirname, "public")));

// Envio de archivos correctamente filtrados
app.get("/file", (req, res) => {
    res.sendFile(path.join(__dirname, "public/ejemplito.txt"));
});

// Descarga de archivos
app.get("/download", (req, res) => {
    res.download(path.join(__dirname, "public/ejemplito.txt"), "ejemplito-descargado.txt", (err) => {
        if (err) {
            console.error("Error en la descarga:", err);
        }
    });
});

// Server
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
