import {Box, Grid, IconButton, Paper, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
import {Messages} from "./Messages";
import {useSockets} from "../../utils/isCheckers/sockets/SocketUtil";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#121212',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  overflow: "auto",
}));

type Props = {
  userId: string;
  convID: string
};

export const ChatMessages = (props: Props) => {
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<undefined | Blob>();
  const {sendMessage} = useSockets();

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (content || file) {
      if (file && file.size > 10000000) {
        alert('File should be smaller than 1MB')
        return
      }

      const reader = new FileReader();
      if (file) {
        reader.onload = async function (e) {
          // @ts-ignore
          const rawData = e.target.result
          if (rawData) {
            await sendMessage(props.convID, content, props.userId, rawData)
          }
        }
        reader.readAsArrayBuffer(file);
        const data = new FormData()
        data.append("file", file, 'file')
      } else {
        await sendMessage(props.convID, content, props.userId, 'empty')
      }
    }
  }

  return (
    <>
      <Grid item sx={{ height: "79%", backgroundColor: '#121212', border: 2,
        borderColor: '#ff9800',
      }} maxHeight={"83%"} overflow={"hidden"}>
        <Item>
          <Messages userID={props.userId} />
        </Item>
      </Grid>
      <Grid item
            borderLeft={4}
            borderRight={4}
            borderColor={'#ff9800'}
            sx={{ height: "11%", overflow: 'hidden' }}>
        <Item sx={{ overflow: 'hidden'}}>
          <Box
              component="form"
              onSubmit={send}
              sx={{ mt: 1 }}
              height={"100%"}
              flexDirection={'row'}
              alignItems={'center'}

          >
            <Grid container
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            paddingX={3}
            paddingBottom={2}>
              <Grid item width={'95%'}>
            <TextField
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              fullWidth
              error={!(content && file)}
              id="text"
              label="Text"
              name="text"
              inputProps={{ style: { color: "#ff9800" } }}
              InputLabelProps={{
                style: { color: '#fff'},
              }}
              sx={{
                '& label.Mui-focused': {
                  color: 'white',
                },'& .MuiInput-underline:after': {
                  borderBottomColor: 'yellow',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'yellow',
                  },
                },}}
            />
              </Grid>
              <Grid item>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={event => event.target.files && setFile(event.target.files[0])}
                    id="raised-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="raised-button-file">
                  <IconButton component="span">
                    <FileUploadIcon sx={{color: "#ff9800"}}/>
                  </IconButton>
                </label>
              </Grid>
            </Grid>
          </Box>
        </Item>
      </Grid>
    </>
  );
};
