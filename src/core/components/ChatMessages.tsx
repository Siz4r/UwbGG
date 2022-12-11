import { Grid, Paper, TextField } from "@mui/material";
import { Messages } from "./Messages";
import { styled } from "@mui/material/styles";
import { Message, UserData } from "./types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  overflow: "auto",
}));

type Props = {
  userId: string;
  messages: Message[];
};

export const ChatMessages = (props: Props) => {
  return (
    <>
      <Grid item sx={{ height: "79%" }} maxHeight={"83%"} overflow={"hidden"}>
        <Item>
          <Messages messages={props.messages} userId={props.userId} />
        </Item>
      </Grid>
      <Grid item sx={{ height: "10%" }}>
        <Item>
          <form noValidate>
            <TextField id="standard-basic" label="Type here" fullWidth />
          </form>
        </Item>
      </Grid>
    </>
  );
};
