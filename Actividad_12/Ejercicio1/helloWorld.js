// Importacion de Express
const express = require("express");

// Crear App de Express
const app = express();

// Configurar de ruta raiz
app.get("/", (req, res) => {
    res.send("Hello World desde Express!");
});

// Usamos el puerto 3000
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
