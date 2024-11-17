const express = require('express');
const debug = require('debug');

// Herramienta debug
const debugLog = debug("app:log");
const debugError = debug("app:error");

const app = express();
const PORT = 3000;

// Middleware para registro de solicitudes
app.use((req, res, next) => {
    debugLog(`Solicitud recibida: ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    debugLog("Accedio a la ruta principal");
    res.send("Bienvenido a la aplicación con debug habilitado.");
});

// Ruta con error simulado
app.get("/error", (req, res, next) => {
    debugError("Se generó un error en esta ruta");
    next(new Error("Este es un error simulado"));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    debugError(`Error capturado: ${err.message}`);
    res.status(500).send("Ocurrió un error en el servidor.");
});

// Server
app.listen(PORT, () => {
    debugLog(`Servidor ejecutándose en http://localhost:${PORT}`);
});
