import {Alert, Snackbar} from "@mui/material";
import * as React from "react";

type Props = {
    open: boolean,
    setOpen: (open:boolean) => void
    content: string
}

export const SuccessHandler = (props: Props) => {
    const handleClick = () => {
        props.setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpen(false);
    };

    return <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>{props.content}</Alert>
    </Snackbar>
}