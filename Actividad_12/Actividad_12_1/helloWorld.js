const express = require('express');
const app = express()
const port = 3000
app.get('/', (req, res) => {
    res.send('Hello Wordl desde Express!')
})
app.listen(port, () => {
    console.log(`App Hello World escuchando desde el puerto ${port}`)
})