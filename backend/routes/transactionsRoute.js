const express = require('express');
const transactionsRouter = express.Router();
const { Transaction } = require('../models/Transaction');

// Add a new transaction
transactionsRouter.post('/', async (req, res) => {
    //TODO: Implement validations for the req.body

    const transaction = new Transaction({
        trading_party: 'Me',
        counter_party: req.body.counter_party,
        amount: req.body.amount,
    });

    await transaction.save();
    res.status(200).json({ created: true, id: transaction._id });
})

transactionsRouter.get('/', async (req, res) => {
    const transactions = await Transaction.find({}).exec();

    //TODO: Require the compression function from helpers.js
    //TODO: Output the response as a CSV file (look for content disposition)
    //TODO: Differentiate between getAll compressed and uncompressed (via a parameter)
    res.status(200).json(transactions)
});

module.exports = {
    transactionsRouter
};