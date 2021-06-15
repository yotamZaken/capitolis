const mongoose = require('mongoose');

const transaction = new mongoose.Schema({
    trading_party: {
        type: String,
        required: true
    },
    counter_party: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
})

const Transaction = new mongoose.model('Transaction', transaction);

module.exports = {
    Transaction
};