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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFriends([...friends, { name: newFriend, selected: false }]);
    setNewFriend("");
  };

  const handleSelect = (event: SelectChangeEvent<string>) => {
    const friend = event.target.value as string;
    const updatedFriends = friends.map((f) =>
      f.name === friend ? { ...f, selected: true } : f
    );
    setFriends(updatedFriends);
    setNewFriend("");
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
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(event: any) => setName(event.target.value)}
            />
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
            <Button type="submit">Add friend</Button>
          </form>
          {name && <Typography variant="h6">{name}</Typography>}

          {friends.length > 0 ? (
            <>
              <List
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {friends.map((friend) => (
                  <ListItem key={friend.name}>
                    <ListItemText primary={friend.name} />
                  </ListItem>
                ))}
              </List>
              <Typography
                variant="h6"
                sx={{
                  backgroundColor: "#3f51b5",
                }}
              >
                Selected friends:
              </Typography>
              <List
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {friends.map((friend) => (
                  <ListItem key={friend.name}>
                    <ListItemText primary={friend.name} />
                  </ListItem>
                ))}
              </List>
            </>
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

          {newFriend && <Button type="submit">Add friend</Button>}
        </Box>
      </Modal>
    </div>
  );
};

export default ConversationView;
