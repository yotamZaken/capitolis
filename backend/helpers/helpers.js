const { Parser } = require('json2csv');

const compressTransactions = (transactions) => {
    let compressed = {};

    // Object structure
    // tradingParty<>counterParty
    // amount

    // For each transaction - check if combination of tradingParty & counterparty already exist in the object
    // if true > add transaction amount to the compressed line's total
    // if false > add a new compressed line w/ the current amount

    transactions.forEach((curr) => {
        if (`${curr.trading_party}-${curr.counter_party}` in compressed) {
            compressed[`${curr.trading_party}-${curr.counter_party}`].amount += curr.amount
        } else {
            let compressedObj = {
                trading_party: curr.trading_party,
                counter_party: curr.counter_party,
                amount: curr.amount
            }

            compressed[`${curr.trading_party}-${curr.counter_party}`] = compressedObj;
        }
    })

    return Object.values(compressed);
}

const convertToCsv = (compressedTransactions) => {

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(compressedTransactions);

    return csv;
}


module.exports = {
    compressTransactions,
    convertToCsv
}