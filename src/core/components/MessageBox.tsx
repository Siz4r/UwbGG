import {styled} from "@mui/material/styles";
import {Avatar, Box, Grid, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {Message} from "./types";

type Props = {
    message: Message;
    userId: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

export const MessageBox = (props: Props) => {
    return <Box>
        <Grid container alignItems="center"
              justifyContent={props.userId === props.message.ownerId ? 'flex-end' : 'flex-start'} direction={'row'}>
        <Grid item direction={'row'} justifyItems={'flex-end'}>

        <ListItemText>
        <StyledPaper>
            <Grid container
                  flexGrow={'0'}
                  spacing={2}
                  alignItems={"flex-end"}
        width={"auto"}>

                <Grid item flexGrow={0}>
                    <Avatar>{props.message.nick.charAt(0)}</Avatar>
                </Grid>
                <Grid item xs>
                    <Typography>{props.message.content}</Typography>
                </Grid>
            </Grid>
        </StyledPaper>

    </ListItemText>
        </Grid>
    </Grid>
    </Box>
}