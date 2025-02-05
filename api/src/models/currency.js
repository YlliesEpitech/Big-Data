const mongoose = require('mongoose');

const currencySchema = mongoose.Schema({
    currency: { type: Number, required: true }, // Typage en Number
    date: Date,

});

const Currency = mongoose.model('currencies', currencySchema);

module.exports = Currency;