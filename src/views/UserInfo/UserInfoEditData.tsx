import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { UserData } from "../../core/components/types";
import { useAppDispatch } from "../../core/hooks/reduxHooks";
import { editData } from "../../store/Users/api";
import { parseErrorToString } from "../../core/parseErrorToString";
import React, { useRef, useState } from "react";

type Props = {
  user: UserData;
};

export const UserInfoEditData = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef({});

  function handleAccept() {
    clearTimeout(typeof ref.current === "number" ? ref.current : 0);
    setOpen(true);
    ref.current = setTimeout(() => setOpen(false), 2000); // Close the modal after 2 seconds
  }

  const dispatch = useAppDispatch();
  const [nick, setNick] = useState(props.user.nick);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [formError, setFormError] = useState<undefined | string>(undefined);

  const setData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && firstName && lastName && nick) {
      try {
        const result = await dispatch(
          editData({
            userId: props.user.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            nick: nick,
          })
        );

        if (editData.rejected.match(result)) {
          throw result.payload;
        }
      } catch (e) {
        handleAccept();
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
      <Typography variant="h4" gutterBottom>
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
      <Snackbar
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
          {formError}
        </Typography>
      </Snackbar>
    </Box>
  );
};
