const mongoose = require('mongoose')
const Schema = mongoose.Schema



const exameSchema = new Schema({

    nome: {
        type: String,
        required: true
    },

    tipo: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Exame', exameSchema)