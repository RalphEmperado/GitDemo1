const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summativeSchema = Schema({
    fullName: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Summative = mongoose.model('Summative', summativeSchema);
module.exports = Summative;