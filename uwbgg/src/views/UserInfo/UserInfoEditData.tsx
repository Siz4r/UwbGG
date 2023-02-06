import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { UserData } from "../../core/components/types";
import { useAppDispatch } from "../../core/hooks/reduxHooks";
import { editData } from "../../store/Users/api";
import { parseErrorToString } from "../../core/parseErrorToString";
import React, { useRef, useState } from "react";
import {ErrorPopUp} from "../../core/components/ErrorPopUp";
import {SuccessHandler} from "../../core/components/SuccessHandler";

type Props = {
  user: UserData;
};

export const UserInfoEditData = (props: Props) => {
  const dispatch = useAppDispatch();
  const [nick, setNick] = useState(props.user.nick);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [formError, setFormError] = useState<undefined | string>(undefined);
  const [open, setOpen] = useState(false);

  const setData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && firstName && lastName && nick) {
      try {
        const result = await dispatch(
          editData({
            firstName: firstName,
            lastName: lastName,
            email: email,
            nick: nick,
          })
        );

        if (editData.rejected.match(result)) {
          throw result.payload;
        }
        setOpen(true)
      } catch (e) {
        parseErrorToString(e, setFormError);
      }
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={setData}
      sx={{ mt: 1 }}
      height={"100%"}
    >
      <Typography variant="h5" gutterBottom>
        Edit your data
      </Typography>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        defaultValue={props.user.email}
      />

      <TextField
        onChange={(e) => setNick(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="nick"
        label="Nick"
        name="nick"
        autoComplete="nick"
        defaultValue={props.user.nick}
      />
      <TextField
        onChange={(e) => setFirstName(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First name"
        name="firstName"
        autoComplete="firstName"
        defaultValue={props.user.firstName}
      />
      <TextField
        onChange={(e) => setLastName(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last name"
        name="lastName"
        autoComplete="lastName"
        defaultValue={props.user.lastName}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1 }}>
        Change data
      </Button>
      {formError && <ErrorPopUp errorMessage={formError} setFormError={setFormError}/>}
      <SuccessHandler open={open} setOpen={setOpen} content={'Data changed!'} />
    </Box>
  );
};
