const express = require("express");
const app = express();
const port = 3000;

// Configuracion de plantillas
app.set("view engine", "ejs");

// Ruta de renderizado
app.get("/", (req, res) => {
    res.render("index", {
        title: "Hola mundo con EJS",
        subtitle: "Renderizado dinámico con Express y EJS",
    });
});

// Server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
