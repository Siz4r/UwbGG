import {
  Box,
  Button,
  createTheme,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { UserData } from "../../core/components/types";
import { UserInfoEditData } from "./UserInfoEditData";
import { UserInfoResetPassword } from "./UserInfoResetPassword";

export const theme = createTheme();

type Props = {
  user: UserData;
};

export const UserInfoFormInput = (props: Props) => {
  const { firstName, lastName, email, nick } = props.user;

  return (
    <Box
      sx={{
        py: 2,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="h3" gutterBottom>
        {firstName + " " + lastName}
      </Typography>
      <Grid container height={"100%"} flexDirection={"row"}>
        <Grid item width={"50%"}>
          <UserInfoEditData user={props.user} />
        </Grid>
        <Grid item width={"50%"} px={2}>
          <UserInfoResetPassword userId={props.user.id} />
        </Grid>
      </Grid>
    </Box>
  );
};
