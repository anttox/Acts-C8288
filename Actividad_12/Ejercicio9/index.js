const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar JSON y formularios
app.use(express.json()); // JSON
app.use(express.urlencoded({ extended: true })); // Formularios

// Ruta para recibir datos JSON
app.post('/json-data', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ error: 'Name y Age son campos obligatorios' });
    }
    res.status(200).json({ message: `Hola ${name}, tienes ${age} años` });
});

// Ruta para recibir formularios
app.post('/form-data', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title y Description son campos obligatorios');
    }
    res.status(200).send(`Recibido: ${title} - ${description}`);
});

// Server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
