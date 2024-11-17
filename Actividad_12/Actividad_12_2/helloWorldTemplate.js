const express = require('express');
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Este un app de Express',
        subtitle: 'usando EJS como plantilla'})
})
app.listen(port, () => {
    console.log(`App corriendo en http://localhost:${port}`)
})