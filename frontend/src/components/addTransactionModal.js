import React from 'react';
import {makeStyles, Box, TextField} from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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

export default function SimpleModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [tradingParty, setTradingParty] = React.useState('Me');
    const [counterParty, setCounterParty] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [amountError, setAmountError] = React.useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        console.log(e)
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(tradingParty, counterParty, amount);
        if(Math.sign(amount) !== 1) {
            setAmountError(true)
        } else {
            fetch("http://localhost:3001/transactions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    "trading_party": tradingParty,
                    "counter_party": counterParty,
                    "amount": amount,
                })
            }).then(response => {
                if (response.status === 200) {
                    props.refreshTransactions()
                    handleClose()
                }
            })
        }

    };

    const body = (
        <Box style={modalStyle} className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <h2>Trading Party</h2>
                <TextField onInput={e => setTradingParty(e.target.value)}
                           required value={tradingParty} id={"standard-required"}/>
                <h2>Counterparty</h2>
                <TextField onInput={e => setCounterParty(e.target.value)} required value={counterParty}
                           id={"standard-required"} label={"Required"}/>
                <h2>Amount</h2>
                <TextField onInput={e => setAmount(e.target.value)} error={amountError} helperText={amountError ? 'Amount must be a positive number' : 'Enter amount'} required value={amount} id={"standard-required"}
                           label={"Required"}/>

                <Button className={classes.textButton} type="submit">Add</Button>
            </form>
        </Box>
    );

    return (
        <div>
            <Button className={classes.textButton} onClick={handleOpen} >Add New Transaction</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
