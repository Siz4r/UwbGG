import Nav from "../Nav";
import { Box, Grid } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export const AuthenticatedView = (props: Props) => {
  return (
    <Box height={"100%"}>
      <Grid container flexDirection={"column"} height={"100%"}>
        <Grid item maxHeight={"10%"}>
          <Nav />
        </Grid>
        <Grid
          item
          height={"90%"}
          sx={{
            position: "relative",
            height: "90%",
          }}
        >
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
};
