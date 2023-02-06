import { UserChatData } from "./types";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {useAppDispatch} from "../hooks/reduxHooks";
import {deleteUserFromConv} from "../../store/Conversations/api";
import {Participant} from "./Participant";

type Props = {
  convID: string;
  participants: UserChatData[];
};

export const Participants = (props: Props) => {
  const dispatch = useAppDispatch()
  const deleteFromConv = (userID: string) => {
    dispatch(deleteUserFromConv({convID: props.convID, userID: userID}))
  }

  const addToConv = () => {
    
  }

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <TableContainer component={Paper} sx={{ border: "2px solid #ff9800"}}>
      <Table sx={{ minWidth: 650, height: '100%', backgroundColor: '#121212', border: 2,
                borderColor: '#ff9800'}} aria-label="simple table">
        <TableHead>
          <TableRow style={{"height": '35px' }}
          sx={{"& th": {
              fontSize: "1.25rem",
              color: "rgba(96, 96, 96)",
              border: "2px solid #ff9800"
            }}}>
            <TableCell align="left">First name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Nick&nbsp;</TableCell>
            <TableCell
              align="right"
              sx={{
                maxWidth: "60px",
              }}
            >
              Actions
            </TableCell>
            <TableCell align="center">
              <Participant participantsIDs={props.participants.map(p => p.id)} convID={props.convID}/>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{
          border: "2px solid #ff9800"
        }}>
          {props.participants.map((participant) => (
            <TableRow
              key={participant.id}
              sx={{
                // "&:last-child td, &:last-child th": { border: 0 },
                "& th": {
                  fontSize: "1.25rem",
                  color: "rgba(96, 96, 96)",
                  border: "2px solid #ff9800",
                }}}
              style={{"height": '35px' }}
            >
              <TableCell component="th" scope="row" align={"left"}>
                {participant.firstName}
              </TableCell>
              <TableCell align="left"
                         component="th"
              sx={{
                "& th": {
                  fontSize: "1.25rem",
                  color: "rgba(96, 96, 96)"
                }
              }}>{participant.lastName}</TableCell>
              <TableCell align="left"
                         component="th"
              sx={{
                "& th": {
                  fontSize: "1.25rem",
                  color: "rgba(96, 96, 96)"
                }
              }}>{participant.nick}</TableCell>
              <TableCell component="th"
                sx={{
                  "& th": {
                    fontSize: "1.25rem",
                    color: "rgba(96, 96, 96)"
                  },
                  maxWidth: "60px",
                }}
                align="right"
              >
                <Button>
                  <DeleteIcon sx={{color: 'red'}} onClick={() => {deleteFromConv(participant.id)}}/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
