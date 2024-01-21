import Nav from "../Nav";
import { Box, Grid } from "@mui/material";
import {useSelectUser} from "../hooks/SelectUser/SelectUser";
import {isBoolean} from "../../utils/isCheckers/isBoolean";
import {useNavigate} from "react-router";
import {RouterPathsKeys} from "../../types/RouterPaths";

type Props = {
  children: React.ReactNode;
};

export const AuthenticatedView = (props: Props) => {
    const {user} = useSelectUser()
    const navigate = useNavigate()

    if (isBoolean(user)) {
        navigate(RouterPathsKeys.LOGIN)
    }

  return (
    <Box height={"100%"}>
      <Grid container flexDirection={"column"} height={"100%"} flexWrap={'nowrap'}>
        <Grid item maxHeight={"6%"}>
          <Nav />
        </Grid>
        <Grid
          item
          height={"90%"}
          sx={{
            // position: "relative",
            height: "94%",
              overflow: 'hidden'
          }}
        >
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
};
