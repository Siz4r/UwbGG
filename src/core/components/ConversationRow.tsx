import { Message } from "./types";
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { timeDiff, truncate } from "../utils";
import { dark } from "@mui/material/styles/createPalette";
import moment from "moment";

type Props = {
  id: string;
  name: string;
  isActive: boolean;
  lastMessage: Message;
};

export const ConversationRow = (props: Props) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItemButton key={props.id}>
        <ListItemText>
          <Grid container spacing={0.5} direction={"column"}>
            <Grid item ml={1}>
              <Typography
                variant={"h6"}
                textAlign={"start"}
                sx={{ color: "#616161" }}
              >
                {props.name}
              </Typography>
            </Grid>
            <Grid container ml={1}>
              <Grid item xs={9} textAlign={"start"}>
                <Typography
                  sx={{
                    color: "#757575",
                  }}
                >
                  {props.lastMessage.nick +
                    ": " +
                    truncate(props.lastMessage.content, 16)}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ color: "#616161" }} textAlign={"end"}>
                  {timeDiff(props.lastMessage.sendTime, new Date())}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </ListItemText>
      </ListItemButton>
    </Box>
  );
};
