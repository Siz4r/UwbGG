import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import {Avatar, Box, Grid, IconButton, Tab, Tabs, Typography,} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useAppDispatch} from "../hooks/reduxHooks";
import {leaveConversation} from "../../store/Conversations/api";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid>
          <Box sx={{ p: 1.5, width: "auto", color: '#ff9800' }}>
            <Typography color={'#ff9800'}>{children}</Typography>
          </Box>
        </Grid>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

type Props = {
  setView: (view: number) => void;
  convName: string;
  convID: string;
  userRole: string;
};

export const ChatHeader = (props: Props) => {
  const [value, setValue] = React.useState(0);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.setView(newValue);
    setValue(newValue);
  };

  const leaveConv = () => {
    dispatch(leaveConversation(props.convID))
  }

  return (
    <Grid
      container
      alignItems={"center"}
      height={"60%"}
      direction={"row"}
      width={"100%"}
      color={'#ff9800'}
      mt={3}
      sx={{backgroundColor: '#121212'}}
    >
      <Grid item>
        <MenuItem>
          <Typography sx={{ paddingLeft: "0.8vh" }}>
            {" "}
            {props.convName}
          </Typography>
        </MenuItem>
      </Grid>
      <Grid item>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab sx={{
              color: '#ff9800'
            }} label="Chat" {...a11yProps(0)} />
            {props.userRole === "ADMIN" && <Tab sx={{
              color: '#ff9800'
            }} label="Participants" {...a11yProps(1)} />}
          </Tabs>
        </Box>
      </Grid>
      <TabPanel value={value} index={0}>
        Chat
      </TabPanel>
      <TabPanel value={value} index={1}>
        Participants
      </TabPanel>
      <Grid
        item
        sx={{
          paddingLeft: 3,
          backgroundColor: "palette.error.main",
        }}
      >
        <IconButton onClick={() => leaveConv()}>
          <LogoutIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
