import {Snackbar, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";

type Props = {
    errorMessage: string
    setFormError: (message: string) => void
}
export const ErrorPopUp = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef({});

    function handleAccept() {
        clearTimeout(typeof ref.current === "number" ? ref.current : 0);
        setOpen(true);
        ref.current = setTimeout(() => {
            setOpen(false)
            props.setFormError('')
        }, 2000); // Close the modal after 2 seconds
    }

    useEffect(() => {
        handleAccept()
    }, [props.errorMessage])

    return <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
            backgroundColor: "lightgray",
            padding: 3,
            borderRadius: 2,
        }}
    >
        <Typography
            variant="h4"
            sx={{
                color: "#2e7d32",
            }}
        >
            {props.errorMessage}
        </Typography>
    </Snackbar>
}