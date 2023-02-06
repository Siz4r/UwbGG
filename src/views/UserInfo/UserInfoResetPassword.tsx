import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../core/hooks/reduxHooks";
import { newPassword } from "../../store/Users/api";
import { parseErrorToString } from "../../core/parseErrorToString";
import {SuccessHandler} from "../../core/components/SuccessHandler";

type Props = {
  userId: string;
};

export const UserInfoResetPassword = (props: Props) => {
  const dispatch = useAppDispatch();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const setPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    if (currentPassword && newPass && repeatedPassword) {
      if (repeatedPassword !== newPass) {
        setFormError("Passwords don't match!");
      } else {
        try {
          const result = await dispatch(
            newPassword({
              userId: props.userId,
              currentPassword: currentPassword,
              newPassword: newPass,
            })
          );

          if (newPassword.rejected.match(result)) {
            throw result.payload;
          }
          setOpen(true)
        } catch (e) {
          parseErrorToString(e, setFormError);
        }
      }
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={setPassword}
      sx={{ mt: 1 }}
      height={"100%"}
    >
      <Typography variant="h5" gutterBottom>
        Change password
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        onChange={(e) => setCurrentPassword(e.target.value)}
        name="currentPassword"
        label="Current password"
        id="currentPassword"
        autoComplete="current-password"
        type="password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        onChange={(e) => setNewPass(e.target.value)}
        name="newPassword"
        label="New password"
        id="newPassword"
        autoComplete="new-password"
        type="password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        onChange={(e) => setRepeatedPassword(e.target.value)}
        name="repeatPassword"
        label="Repeat password"
        id="repeatPassword"
        autoComplete="repeat-password"
        type="password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1 }}>
        Confirm
      </Button>
      <SuccessHandler open={open} setOpen={setOpen} content={'Password changed'} />
    </Box>
  );
};
