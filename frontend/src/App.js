import {useState, useEffect} from 'react'
import {Box, Button, makeStyles} from "@material-ui/core";
import './App.css';
import BasicTable from './components/table';
import SimpleModal from "./components/addTransactionModal";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textButton: {
        border: '1px solid black',
        borderRadius: 10,
        padding: "1rem",
        margin: "1rem",
    }
}));

function App() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [transactions, setTransactions] = useState({payingTransactions: [], receivingTransactions: []});
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()


    const fetchTransactions = (setTransactions, setIsLoaded, setError) => {
        try {
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
            
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        fetchTransactions(setTransactions, setIsLoaded, setError)
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
                    <SimpleModal refreshTransactions={() => { fetchTransactions(setTransactions, setIsLoaded, setError) }}/>
                    <Button className={classes.textButton} onClick={() => {window.location.href="http://localhost:3001/transactions/compressed"}}>Compress Transactions</Button>
                </Box>
            </div>
        )
    }
}

export default App;
