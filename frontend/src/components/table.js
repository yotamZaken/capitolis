import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        maxWidth: "50%",
        padding: "2rem",
        margin: "0 auto"
    },
    titleContainer: {
        border: '1px solid black',
        borderRadius: 10,
        mx: "0 auto",
        width: "25%",
        height: "3rem",
        lineHeight: 2.5,
        color: "black",
        margin: "0 auto",
        marginTop: "2rem"
    }
});

export default function BasicTable(props) {
    const classes = useStyles();
    let tableResult = props.result;
    if (tableResult === undefined) {
        tableResult = []
    }
    return (
        <TableContainer component={Paper}>
            <Box className={classes.titleContainer}>{props.title}</Box>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Counterparty Name</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableResult.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.counter_party}
                            </TableCell>
                            <TableCell>{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
