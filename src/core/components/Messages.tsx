import {Box, Grid, List} from "@mui/material";
import {Message} from "./types";
import {MessageBox} from "./MessageBox";

type Props = {
    messages: Message[];
    userId: string
}

export const Messages = (props: Props) => {
    return <List component={'strong'} sx={{ overflow: 'auto'}}>
        {props.messages.map(m =>
                    <MessageBox message={m} key={m.id} userId={props.userId}/>)}
    </List>


}