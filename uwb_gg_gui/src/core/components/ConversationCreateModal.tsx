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
import {useFriends} from "../hooks/Invitations/useFriends";
import {parseErrorToString} from "../parseErrorToString";
import {ErrorPopUp} from "./ErrorPopUp";
import {SuccessHandler} from "./SuccessHandler";

interface Props {
  name: string;
  friends: User[];
  userID: string;
}

const ConversationView: React.FC<Props> = (props) => {
  const [name, setName] = useState(props.name);
  const {friends: data} = useFriends({ fetchOnMount: true })
  const [friends, setFriends] = useState(!data ? [] : data.map((friend) => ({ user: friend, selected: false })))
  const [newFriend, setNewFriend] = useState<string>(friends[0] && friends[0].user.id);
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const createNewConv = async () => {
    const selectedFriends = friends
      .filter((f) => f.selected)
      .map((f) => f.user);
    if (selectedFriends.length > 0 && name) {
      try {
        const result = await dispatch(addConversation({ name: name, participants: selectedFriends, userID: props.userID }))

        if (addConversation.rejected.match(result)) {
          throw result
        }
        setOpen(true)
      } catch (e) {
        parseErrorToString(e, setFormError)
      } finally {
        setModalOpen(false)
      }
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
    const newSelectedFriend = updatedFriends.filter((f) => !f.selected)[0];
    if (newSelectedFriend) setNewFriend(newSelectedFriend.user.id);
  };

  const handleSelect = (event: SelectChangeEvent) => {
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
              {friends
                  .filter(friend => !friend.selected)
                  .length > 0 &&
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
              </Select>}
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
      {formError && <ErrorPopUp errorMessage={formError} setFormError={setFormError} />}
      <SuccessHandler open={open} setOpen={setOpen} content={'Conversation created successfully'} />
    </div>
  );
};

export default ConversationView;
