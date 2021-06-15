import React from 'react';
import {makeStyles, Box, TextField} from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import TextButton from "./button";


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
}));

export default function SimpleModal() {
    //TODO: Add data validations (buttons)
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <Box style={modalStyle} className={classes.paper}>
            <h2>Trading Party</h2>
            <TextField required id={"standard-required"} defaultValue={"Me"} />
            <h2>Counterparty</h2>
            <TextField required id={"standard-required"} label={"Required"}/>
            <h2>Amount</h2>
            <TextField required id={"standard-required"} label={"Required"}/>

            {/*Onclick - Post Transaction is fired*/}
            <TextButton onClick={handleClose} title={"Add"}/>
        </Box>
    );

    return (
        <div>
            <TextButton onClick={handleOpen} title={"Add New Transaction"}/>
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
