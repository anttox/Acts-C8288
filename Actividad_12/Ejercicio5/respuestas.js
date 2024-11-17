const express = require('express');

const app = express();
const PORT = 3000;

// Encabezados
app.get("/set-header", (req, res) => {
    res.set("Custom-Header", "Este es un encabezado personalizado");
    res.send("Encabezado personalizado configurado.");
});

// Estados del servidor
app.get("/status-ok", (req, res) => {
    res.status(200).send("Todo está bien (200 OK).");
});

app.get("/status-not-found", (req, res) => {
    res.status(404).send("Recurso no encontrado (404 Not Found).");
});

app.get("/status-server-error", (req, res) => {
    res.status(500).send("Error interno del servidor (500 Internal Server Error).");
});

// Redirecciones
app.get("/redirect-external", (req, res) => {
    res.redirect("https://example.com");
});

app.get("/redirect-internal", (req, res) => {
    res.redirect("/set-header");
});

// Formato de envio de datos
app.get("/send-text", (req, res) => {
    res.send("Esto es una respuesta en formato texto.");
});

app.get("/send-json", (req, res) => {
    res.json({ message: "Esto es una respuesta en formato JSON.", status: "success" });
});

app.get("/send-file", (req, res) => {
    const filePath = __dirname + "/hola.txt"; 
    res.sendFile(filePath);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
