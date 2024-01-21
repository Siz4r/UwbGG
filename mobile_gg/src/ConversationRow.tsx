import {
  Box,
  Grid,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { Message } from './store/Conversations/types'
import { timeDiff, truncate } from './core/utils'

type Props = {
  id: string;
  name: string;
  isActive: boolean;
  lastMessage?: Message;
};

export const ConversationRow = (props: Props) => {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItemButton key={props.id} sx={{width: "100%"}}>
        <ListItemText sx={{width: "100%"}}>
          <Grid container spacing={0.5}  sx={{width: "100%"}} direction={"column"}>
            <Grid container ml={1} flexDirection={'row'} sx={{width: "100%"}} xs={12}>
              <Grid item xs={11}>
              <Typography
                variant={"h6"}
                textAlign={"start"}
                sx={{ color: "#616161" }}
              >
                {props.name}
              </Typography>
              </Grid>
              <Grid item>
              <CircleIcon sx={{ color: props.isActive ? 'green' : 'red' }}/>
              </Grid>

            </Grid>
            <Grid container sx={{width: "100%"}} ml={1}>
              <Grid item textAlign={"start"}>
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
              <Grid item>
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
