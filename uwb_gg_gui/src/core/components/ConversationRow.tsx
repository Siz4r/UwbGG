import { Message } from "./types";
import {
  Box,
  Grid,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { timeDiff, truncate } from "../utils";

type Props = {
  id: string;
  name: string;
  isActive: boolean;
  lastMessage?: Message;
};

export const ConversationRow = (props: Props) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItemButton key={props.id}>
        <ListItemText>
          <Grid container spacing={0.5} direction={"column"}>
            <Grid container ml={1} flexDirection={'row'}>
              <Grid item>
              <Typography
                variant={"h6"}
                textAlign={"start"}
                width={'80%'}
                sx={{ color: "#616161" }}
              >
                {props.name}
              </Typography>
              </Grid>
              <Grid item>
              <CircleIcon sx={{ color: props.isActive ? 'green' : 'red' }}/>
              </Grid>

            </Grid>
            <Grid container ml={1}>
              <Grid item xs={9} textAlign={"start"}>
                <Typography
                  sx={{
                    color: "#757575",
                  }}
                >
                  {props.lastMessage
                    ? props.lastMessage.nick +
                      ": " +
                      truncate(props.lastMessage.content, 16)
                    : "Nowa konwersacja!"}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                {props.lastMessage && (
                  <Typography sx={{ color: "#616161" }} textAlign={"end"}>
                    {timeDiff(props.lastMessage.sendTime, new Date())}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </ListItemText>
      </ListItemButton>
    </Box>
  );
};
