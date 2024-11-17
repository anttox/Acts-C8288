const express = require("express");
const app = express();

// Ruta estatica para raiz "/"
app.get("/", (req, res) => {
  res.send("Bienvenido a la pagina principal.");
});

// Ruta estatica para usuarios
app.get("/users", (req, res) => {
  res.send("Lista de usuarios.");
});

// Ruta estatica para "/about"
app.get("/about", (req, res) => {
  res.send("Sobre nosotros.");
});

// Ruta dinamica para id de usuarios
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Detalles del usuario con ID: ${userId}`);
});

// Ruta con parametros opcionales "/invoice/:id?"
app.get("/invoice/:id?", (req, res) => {
  const invoiceId = req.params.id;
  if (invoiceId) {
    res.send(`Detalles de la factura con ID: ${invoiceId}`);
  } else {
    res.send("No hay ID de factura proporcionado.");
  }
});

// Ruta con expresiones regulares, que terminen en FLY
app.get(/fly$/, (req, res) => {
  res.send("Ruta que coincide con palabras que terminan en 'fly'.");
});

// Orden de rutas
app.get("/test", (req, res) => {
  res.send("Ruta especificada para /test");
});

app.get("/test/:id", (req, res) => {
  res.send("Ruta dinamica para /test/:id");
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
