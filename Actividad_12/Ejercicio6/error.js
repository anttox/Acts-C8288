const express = require('express');

const app = express();
const PORT = 3000;

// Middleware para manejo de errores
const errorMiddleware = (err, req, res, next) => {
    console.error("Error capturado:", err.message);
    res.status(500).json({
        error: true,
        message: "Ocurrio un error en el servidor. Por favor, intentelo mas tarde.",
    });
};

app.get("/", (req, res) => {
    res.send("Bienvenido a la aplicacion donde haremos un correcto uso de  manejo de errores.");
});

// Generacion de errores
app.get("/error-intencional", (req, res, next) => {
    const error = new Error("Este es un error intencional, no se alarme.");
    next(error); 
});

app.get("/otro-error", (req, res, next) => {
    next(new Error("Otro error generado intencionalmente, no se alarme."));
});

app.use(errorMiddleware);

// Server
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
