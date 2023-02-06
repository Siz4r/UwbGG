import AddIcon from "@mui/icons-material/Add";
import {
    Box,
    Button,
    Grid,
    IconButton,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {theme} from "../../views/UserInfo/UserInfoFormInput";
import {ErrorPopUp} from "./ErrorPopUp";
import {useFriends} from "../hooks/Invitations/useFriends";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {addParticipant} from "../../store/Conversations/api";
import {parseErrorToString} from "../parseErrorToString";

type Props = {
    participantsIDs: string[]
    convID: string
}

export const Participant = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [formError, setFormError] = useState<string | undefined>(undefined);
    const {friends: data} = useFriends({ fetchOnMount: true })
    const friends = data.filter(friend => !props.participantsIDs.includes(friend.id))
    const [selectedFriend, setSelectedFriend] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>()
    const handleSelect = (event: SelectChangeEvent) => {
        const friend = event.target.value as string;
        setSelectedFriend(friend)
    };

    const add = async () => {
        if (selectedFriend) {
            try {
                const result = await dispatch(addParticipant({
                    convID: props.convID,
                    userID: selectedFriend
                }))

                if (addParticipant.rejected.match(result)) {
                    throw result
                }
            } catch (e) {
                return parseErrorToString(e, setFormError)
            }
        }
    }



    return <div><Button onClick={() => setModalOpen(true)}>
        <AddIcon sx={{color: 'green'}}/> <Typography sx={{color: 'green'}}>Add participant</Typography>
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
                            .filter(friend => friend.nick.includes(name))
                            .length > 0 &&
                        <Select
                            label="Add friend"
                            value={selectedFriend}
                            onChange={handleSelect}
                        >
                            {friends
                                .filter((friend) => friend.nick.includes(name))
                                .map((friend) => (
                                    <MenuItem key={friend.id} value={friend.id}>
                                        {friend.nick
                                            ? friend.nick
                                            : friend.firstName + " " + friend.lastName}
                                    </MenuItem>
                                ))}
                        </Select>}
                </Grid>
                    <IconButton onClick={() => add()}>
                        <AddIcon />
                    </IconButton>
                {friends.length === 0 && <Typography
                    variant="body2"
                    pl={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    You don't have any more friends to invite
                </Typography>}
            </Grid>

        </Box>
    </Modal>
        {formError && <ErrorPopUp errorMessage={formError} setFormError={setFormError} />}</div>
}