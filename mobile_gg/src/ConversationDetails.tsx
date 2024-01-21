import { ConvChatDto } from './store/Conversations/types'
import {
  Avatar,
  Button,
  CardMedia,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { format } from 'date-fns'

type Props = {
  data?: ConvChatDto
}


export const ConversationDetails = ({data}: Props) => {

  const [showMessages, setShowMessages] = useState(false);


  const [showParticipants, setShowParticipants] = useState(false);
  const handleShowMessages = () => {

    setShowMessages(!showMessages);
  };
  const handleShowParticipants = () => {

    setShowParticipants(!showParticipants);
  };
  if (data === undefined) return <></>

  const {
    id,
    name,
    createdAt,
    isSilenced,
    chatPhoto,
    nicks,
    theme,
    isFavourite,
    messages,
    participants,
  } = data;

  const formattedDate = format(createdAt, 'HH:mm:ss, dd-MM-yyyy');
  return <Grid container flexGrow={1}>
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: 'rgb(40, 37, 53)'
    }}>
      <Typography variant="h4" color={'white'}>Chat Details</Typography>
      <Typography>ID: {id}</Typography>
      <Typography>Name: {name}</Typography>
      <Typography>Created At: {formattedDate}</Typography>
      <Typography>Is Silenced: {isSilenced ? 'Yes' : 'No'}</Typography>
      <Typography>Chat Photo: </Typography>
      <CardMedia component="img" alt="Chat Photo" sx={{ height: '8em', width: '8em', margin: 'auto'}}   image={chatPhoto} />
      <Typography>Nicks: {nicks.join(', ')}</Typography>
      <Typography>Theme: {theme}</Typography>
      <Typography>Is Favourite: {isFavourite ? 'Yes' : 'No'}</Typography>

      <Typography variant="h4" color={'white'}>Messages</Typography>
      <Button onClick={handleShowMessages}>
        {showMessages ? 'Hide Messages' : 'Show Messages'}
      </Button>
      <Collapse in={showMessages}>
        <List color={'white'}>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemText sx={{color: 'white'}}>{message.content}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>

      <Typography variant="h4" color={'white'}>Participants</Typography>
      <Button onClick={handleShowParticipants}>
        {showParticipants ? 'Hide Participants' : 'Show Participants'}
      </Button>
      <Collapse in={showParticipants}>
        <List color={'white'}>
          {participants.map((participant) => (
            <ListItem key={participant.id}>
              <Avatar>{participant.nick.charAt(0)}</Avatar>
              <ListItemText sx={{color: 'white', marginLeft: 3}}>{participant.nick}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Paper>
  </Grid>
}