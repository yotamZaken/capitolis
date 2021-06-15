const compressTransactions = (transactions) => {
    let compressed = {};

    // Object structure
    // tradingParty<>counterParty
    // amount

    // For each transaction
    // check if combination of tradingParty & counterparty already exist in the array
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
    //TODO: Remove the key of each nested object
    //TODO: Form the final array of objects
    console.log(compressed)
}


module.exports = {compressTransactions}