const mongoose = require('mongoose')
const utils = require('../utils/utils')

const dataSchema = new mongoose.Schema({
    key: {
        require: true,
        type: String,
        unique: true
    },
    value: {
        require: true,
        type: String,
        default: utils.randomgen(20)
    },
    createdAt: {
        require: true,
        type: Date,
        expires: utils.getDefaultTTL(),
        default: Date.now()
    }
})

module.exports = mongoose.model('Data', dataSchema);