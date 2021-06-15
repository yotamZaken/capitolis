import {useState, useEffect} from 'react'
import {Box} from "@material-ui/core";
import './App.css';
import BasicTable from './components/table';
import TextButton from "./components/button";
import SimpleModal from "./components/addTransactionModal";

// Rewire the front end and the back end together
function App() {
    // Ideally this would not happen
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [transactions, setTransactions] = useState({payingTransactions: [], receivingTransactions: []});
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:3001/transactions")
            .then(res => res.json())
            .then(
                (result) => {
                    let tempState = {payingTransactions: [], receivingTransactions: []}
                    result.forEach(curr => {
                        if (curr.amount > 0) {
                            tempState.payingTransactions.push(curr);
                        } else {
                            tempState.receivingTransactions.push(curr);
                        }
                    })
                    setIsLoaded(true);
                    setTransactions(tempState);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="App">
                <Box display={"flex"}>
                    <BasicTable result={transactions.payingTransactions} title={"Paying"}/>
                    <BasicTable result={transactions.receivingTransactions} title={"Receiving"}/>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                    <SimpleModal />
                    <TextButton onClick={() => {window.location.href='http://localhost:3001/transactions/compressed'}} title={"Compress Transactions"} />
                </Box>
            </div>
        )
    }
}

export default App;
