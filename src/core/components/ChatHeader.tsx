import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

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
          <Box sx={{ p: 1.5, width: "auto" }}>
            <Typography>{children}</Typography>
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
};

export const ChatHeader = (props: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.setView(newValue);
    setValue(newValue);
  };

  return (
    <Grid
      container
      alignItems={"center"}
      height={"60%"}
      direction={"row"}
      width={"100%"}
    >
      <Grid item>
        <MenuItem>
          <Avatar />
          <Typography sx={{ paddingLeft: "0.8vh" }}>
            {" "}
            że tak powiem tak naprawde
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
            <Tab label="Chat" {...a11yProps(0)} />
            <Tab label="Participants" {...a11yProps(1)} />
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
        <Button>
          <LogoutIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
