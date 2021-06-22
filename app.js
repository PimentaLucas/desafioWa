const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
const rotasLaboratorio = require('./routes/laboratorio')
const rotasExame = require('./routes/exame')

app.use('/laboratorio', rotasLaboratorio)
app.use('/exame', rotasExame)




mongoose
    .connect(
        'mongodb+srv://lucas:ramalu16@cluster0.9nlcx.mongodb.net/desafioWo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, }
    )
    .then(result => {
        console.log('Servidor conectado!!')
        const server = app.listen(process.env.PORT || 8080);
    })