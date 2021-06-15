const express = require('express');
const transactionsRouter = express.Router();
const { Transaction } = require('../models/Transaction');
const {compressTransactions, convertToCsv} = require('../helpers/helpers');

// Add a new transaction
transactionsRouter.post('/', async (req, res) => {
    if (!req.body.counter_party || req.body.counter_party.length === 0) {
        res.status(400).json({ error : true, message : "Counter Party Not Valid"}).end()
        return
    } else if (!req.body.trading_party || req.body.trading_party.length === 0) {
        res.status(400).json({ error : true, message : "Trading Party Not Valid"}).end()
        return
    } else if (!req.body.amount) {
        res.status(400).json({ error : true, message : "Amount should not be a negative number"}).end()
        return
    }

    const transaction = new Transaction({
        trading_party: req.body.trading_party,
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