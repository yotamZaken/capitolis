const express = require('express');
const transactionsRouter = express.Router();
const { Transaction } = require('../models/Transaction');
const {compressTransactions, convertToCsv} = require('../helpers/helpers');

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

    res.status(200).json(transactions)
});

transactionsRouter.get('/compressed', async (req, res) => {
    const transactions = await Transaction.find({}).exec();
    const compressedTransactions = convertToCsv(compressTransactions(transactions));

    res.setHeader('Content-disposition', 'attachment; filename=compressedTransactions.csv');
    res.setHeader('Content-type', 'text/csv');

    res.status(200).send(compressedTransactions).end();
});



module.exports = {
    transactionsRouter
};