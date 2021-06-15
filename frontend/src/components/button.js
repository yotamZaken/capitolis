import React from 'react';
import {makeStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    textButton: {
        border: '1px solid black',
        borderRadius: 10,
        padding: "1rem",
        margin: "1rem",
    }
})

export default function TextButton(props) {
    const classes = useStyles();

    return (
        <Button onClick={props.onClick} className={classes.textButton}>{props.title}</Button>
    )
}