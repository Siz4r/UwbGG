import { Box, Divider, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Message, UserChatData } from "./types";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { useState } from "react";
import { Participants } from "./Participants";

const messages: Message[] = [
  {
    ownerId: "1",
    id: "1",
    content: "Siema",
    sendTime: new Date(),
    noticed: true,
    nick: "Szulborak",
  },
  {
    ownerId: "1",
    id: "2",
    content: "Co tam u cb?",
    sendTime: new Date(),
    noticed: true,
    nick: "Szulborak",
  },
  {
    ownerId: "2",
    id: "3",
    content: "Cze?",
    sendTime: new Date(),
    noticed: true,
    nick: "Siz4r",
  },
  {
    ownerId: "1",
    id: "5",
    content: "Siema",
    sendTime: new Date(),
    noticed: true,
    nick: "Szulborak",
  },
  {
    ownerId: "1",
    id: "6",
    content: "Co tam u cb?",
    sendTime: new Date(),
    noticed: true,
    nick: "Szulborak",
  },
  {
    ownerId: "2",
    id: "7",
    content: "Cze?",
    sendTime: new Date(),
    noticed: true,
    nick: "Siz4r",
  },
  {
    ownerId: "1",
    id: "12",
    content: "Siema",
    sendTime: new Date(),
    noticed: true,
    nick: "Szulborak",
  },
  {
    ownerId: "1",
    id: "23",
    content: "Co tam u cb?",
    sendTime: new Date(),
    noticed: true,
    nick: "Szulborak",
  },
  {
    ownerId: "2",
    id: "34",
    content: "Cze?",
    sendTime: new Date(),
    noticed: true,
    nick: "Siz4r",
  },
  {
    ownerId: "1",
    id: "15",
    content: "Siema",
    sendTime: new Date(),
    noticed: true,
    nick: "Szulborak",
  },
  {
    ownerId: "1",
    id: "26",
    content: "Co tam u cb?",
    sendTime: new Date(),
    noticed: true,
    nick: "Szulborak",
  },
  {
    ownerId: "2",
    id: "31",
    content: "Cze?",
    sendTime: new Date(),
    noticed: true,
    nick: "Siz4r",
  },
];

const user: UserChatData = {
  id: "2",
  nick: "siz4r",
  email: "siema@wp.pl",
  firstName: "Kacper",
  lastName: "Tarasiuk",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  overflow: "auto",
}));

export const ChatWindow = () => {
  const [selectedView, setSelectedView] = useState<number>(0);

  const getView = () => {
    if (selectedView === 0)
      return <ChatMessages userId={user.id} messages={messages} />;
    if (selectedView === 1) return <Participants participants={[user]} />;
  };

  return (
    <Box sx={{ height: "98%" }} overflow={"hidden"}>
      <Grid
        container
        sx={{ height: "100%", flexDirection: "column" }}
        overflow={"hidden"}
      >
        <Grid
          item
          sx={{
            height: "10%",
            "--Grid-borderWidth": "1px",
            borderTop: "var(--Grid-borderWidth) solid",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
            "& > div": {
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
            },
          }}
          overflow={"hidden"}
        >
          <Item>
            <ChatHeader setView={setSelectedView} />
          </Item>
        </Grid>
        <Divider />
        {getView()}
      </Grid>
    </Box>
  );
};
