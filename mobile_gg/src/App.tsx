import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from './core/reduxHooks'
import { getConvData, getConversations } from './store/Conversations/api'
import './App.css'
import { Avatar, Box, Button, Input, InputLabel, Modal } from '@mui/material'
import { setUser } from './store/User/api'
import { Converastions } from './Conversations'
import { ConversationDetails } from './ConversationDetails'
import { ConvChatDto } from './store/Conversations/types'
import uuid from 'react-uuid'

const useConvs = (props: {fetchOnMount?: boolean}) => {
  const dispatch = useAppDispatch();

  const { isLoading, convs} = useAppSelector(({ convs }) => {
    return convs;
  });

  useEffect(() => {
    if (props.fetchOnMount) {
      dispatch(getConversations());
    }
  }, [dispatch, props.fetchOnMount]);

  return {
    isLoading: isLoading,
    convs: convs,
  };
}

const useUser = () => {
  const {isLoading, nickname} = useAppSelector(({user}) => {
    return user
  })

  return {
    isLoading: isLoading,
    nickname: nickname
  }
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 400,
  color: 'white',
  border: '2px solid #616161',
  boxShadow: 24,
};

function App() {
  const dispatch = useAppDispatch()
  const {nickname, isLoading: userLoading} = useUser();
  const {convs, isLoading} = useConvs({fetchOnMount: true})
  const [selectedConvId, setSelectedConvId] = useState<string | undefined>(undefined)
  const [name, setName] = useState('')
  const [detailsOpened, setDetailsOpened] = useState(false)

  const handleSetNickname = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(setUser(name))
  }

  useEffect(() => {
    if (selectedConvId) {
      dispatch(getConvData(selectedConvId))
    }
  }, [selectedConvId])


  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        {selectedConvId && <>
          <Button variant={'contained'} onClick={() => setDetailsOpened(prevState => !prevState)}>{detailsOpened ? 'Chat Room' : 'Details'}</Button>
          <Button variant={'contained'} onClick={() => setSelectedConvId(undefined)}>Go back</Button>
        </>
      }
      </header>
      <section>
        {selectedConvId && !isLoading ?
          (detailsOpened ?
            <ConversationDetails data={convs.filter(conv => conv.id === selectedConvId)[0].convDetails}/> :
            <ChatRoom nick={nickname || ''} messages={convs.filter(conv => conv.id === selectedConvId)[0].convDetails?.messages || []}/>) :
          <Converastions setSelectedConvID={setSelectedConvId} convs={convs}/>}
        <Modal
          open={!nickname}
          onClose={() => {}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <form onSubmit={handleSetNickname}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%'
              }}>
                <InputLabel htmlFor={"nickname"} sx={{color: 'white', marginBottom: 2}}>
                  Set nickname:
                </InputLabel>
                <Input
                  sx={{
                    color: 'white',
                    bgcolor: '#616161',
                    marginBottom: 2,
                    padding: 2,
                    border: '2px solid #2196f3',
                    borderRadius: 2
                  }}
                  placeholder={'Your nick'}
                  id="nickname"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Button type={'submit'} variant={'contained'}>Ready!</Button>
              </form>
          </Box>
        </Modal>
      </section>
    </div>
  );
}

function ChatRoom(props: {nick: string, messages: {id: string, nick: string, content: string, sendTime: Date}[]}) {
  const dummy = useRef<HTMLSpanElement | null>(null);
  const [formValue, setFormValue] = useState('');
  const [messages, setMessages] = useState(props.messages)


  const sendMessage = async (e: any) => {
    e.preventDefault();
    setMessages(prevState => [...prevState, {nick: props.nick, id: uuid(), content: formValue, sendTime: new Date()}])
    setFormValue('');
    // @ts-ignore
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  // @ts-ignore
  return (<>
    <main className={'main'}>

      {messages && messages.map(msg => <ChatMessage nickname={props.nick} message={msg}/>)}
      <span ref={dummy}></span>
    </main>
    <hr/>
    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>
    </form>
  </>)
}


function ChatMessage(props: {nickname: string, message: any}) {
  const { content, nick, sendTime, id } = props.message;

  const messageClass = nick === props.nickname ? 'sent' : 'received' ;
  return (<>
    <div className={`message ${messageClass}`} key={id}>
      <Avatar>{nick.charAt(0)}</Avatar>
      <p>{content}</p>
    </div>
  </>)
}


export default App;
