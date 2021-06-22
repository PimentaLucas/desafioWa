const mongoose = require('mongoose')
const Schema = mongoose.Schema



const laboratorioSchema = new Schema({

    nome: {
        type: String,
        required: true
    },
    endereco: {
        cep: {
            type: String,
            required: true
        },
        logradouro: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        complemento: {
            type: String,
            required: false
        },
        cidade: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
    },
    status: {
        type: Boolean,
        required: true
    },
    exames: [{
        type: Schema.Types.ObjectId,
        ref: 'Exame',
        required: false
    }

    ]

})

module.exports = mongoose.model('Laboratorio', laboratorioSchema)