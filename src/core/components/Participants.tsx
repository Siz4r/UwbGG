import { UserChatData } from "./types";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  participants: UserChatData[];
};

export const Participants = (props: Props) => {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
            <TableCell align="right">
              <Button>
                <AddIcon /> Add participant
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.participants.map((participant) => (
            <TableRow
              key={participant.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align={"left"}>
                {participant.firstName}
              </TableCell>
              <TableCell align="left">{participant.lastName}</TableCell>
              <TableCell align="left">{participant.nick}</TableCell>
              <TableCell
                sx={{
                  maxWidth: "60px",
                }}
                align="right"
              >
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
