const mongoose = require('mongoose')
const utils = require('../controllers/utils/utils')

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
    ttl: {
        require: false,
        type: Date
    }
})

module.exports = mongoose.model('Data', dataSchema);