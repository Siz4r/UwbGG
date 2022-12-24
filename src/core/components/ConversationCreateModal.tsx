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
  IconButton,
} from "@mui/material";
import { theme } from "../../views/UserInfo/UserInfoFormInput";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addConversation } from "../../store/Conversations/api";
import { User } from "../../store/Users/types";

interface Props {
  name: string;
  friends: User[];
}

const ConversationView: React.FC<Props> = (props) => {
  const [name, setName] = useState(props.name);
  const [friends, setFriends] = useState<{ user: User; selected: boolean }[]>(
    props.friends.map((friend) => ({ user: friend, selected: false }))
  );
  const [newFriend, setNewFriend] = useState<string>(friends[0].user.id);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const createNewConv = () => {
    const selectedFriends = friends
      .filter((f) => f.selected)
      .map((f) => f.user);
    if (selectedFriends.length > 0 && name) {
      dispatch(addConversation({ name: name, participants: selectedFriends }));
    }
  };

  const removeFriend = (id: string) => {
    const updatedFriends = friends.map((f) => {
      if (f.user.id === id) return { user: f.user, selected: false };
      else return f;
    });

    setFriends(updatedFriends);
    setNewFriend(updatedFriends.filter((f) => !f.selected)[0].user.id);
  };

  const addNewFriend = () => {
    const updatedFriends = friends.map((f) => {
      if (f.user.id === newFriend) return { user: f.user, selected: true };
      else return f;
    });

    setFriends(updatedFriends);

    setNewFriend(updatedFriends.filter((f) => !f.selected)[0].user.id);
  };

  console.log(newFriend);
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
                    <MenuItem key={friend.user.id} value={friend.user.id}>
                      {friend.user.nick
                        ? friend.user.nick
                        : friend.user.firstName + " " + friend.user.lastName}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <IconButton onClick={() => addNewFriend()}>
              <AddIcon />
            </IconButton>
            <Button onClick={() => createNewConv()}>Create</Button>
          </Grid>
          {friends.length > 0 ? (
            <Grid container flexDirection={"column"} pt={2}>
              <Grid item>
                <Typography variant="h6">Selected friends:</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  width: 400,
                }}
              >
                <List
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 500,
                    flexWrap: "wrap",
                  }}
                >
                  {friends
                    .filter((f) => f.selected)
                    .map((friend) => (
                      <ListItem
                        key={friend.user.id}
                        sx={{
                          maxWidth: "50%",
                        }}
                      >
                        <ListItemText
                          primary={
                            friend.user.nick
                              ? friend.user.nick
                              : friend.user.firstName +
                                " " +
                                friend.user.lastName
                          }
                        />
                        <IconButton
                          onClick={() => removeFriend(friend.user.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
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
