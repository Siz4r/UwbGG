import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
  Modal,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import { theme } from "../../views/UserInfo/UserInfoFormInput";

interface Props {
  name: string;
  friends: string[];
}

const ConversationView: React.FC<Props> = (props) => {
  const [name, setName] = useState(props.name);
  const [friends, setFriends] = useState<{ name: string; selected: boolean }[]>(
    props.friends.map((friend) => ({ name: friend, selected: false }))
  );
  const [newFriend, setNewFriend] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const addNewFriend = () => {
    console.log(newFriend);
    setFriends((prevState) =>
      prevState.map((f) => {
        if (f.name === newFriend) return { name: f.name, selected: true };
        else return f;
      })
    );
    const temp = friends.filter((f) => !f.selected).pop();
    setNewFriend(temp ? temp.name : "");
  };

  const handleSelect = (event: SelectChangeEvent<string>) => {
    const friend = event.target.value as string;
    setNewFriend(friend);
  };

  return (
    <div>
      <Button sx={{ color: "white" }} onClick={() => setModalOpen(true)}>
        Create conversation
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 720,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            direction: "column",
          }}
        >
          <Grid container>
            <Grid item>
              <TextField
                label="Name"
                value={name}
                onChange={(event: any) => setName(event.target.value)}
              />
            </Grid>
            <Grid item>
              <Select
                label="Add friend"
                value={newFriend}
                onChange={handleSelect}
              >
                {friends
                  .filter((friend) => !friend.selected)
                  .map((friend) => (
                    <MenuItem key={friend.name} value={friend.name}>
                      {friend.name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Button onClick={() => addNewFriend()}>Add friend</Button>
          </Grid>
          {friends.length > 0 ? (
            <Grid container flexDirection={"column"}>
              <Grid item>
                <Typography variant="h6">Selected friends:</Typography>
              </Grid>
              <Grid item>
                <List
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {friends
                    .filter((f) => f.selected)
                    .map((friend) => (
                      <ListItem key={friend.name}>
                        <ListItemText primary={friend.name} />
                      </ListItem>
                    ))}
                </List>
              </Grid>
            </Grid>
          ) : (
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Brak przyjaciół
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ConversationView;
