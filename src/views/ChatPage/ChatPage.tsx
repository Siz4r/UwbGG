import {AuthenticatedView} from "../../core/wrappers/AuthenticatedView";
import {Grid, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Converastions} from "../../core/components/Conversations";
import {ChatWindow} from "../../core/components/ChatWindow";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    overflow: 'auto'
}));


export const ChatPage = () => {
    return <AuthenticatedView>
        <Box flex={1} height={'100%'} flexGrow={1}>

        <Grid container sx={{ height: '100%'}} overflow={'hidden'}>
            <Grid item xs={3} height={'100%'} sx={{
                '--Grid-borderWidth': '1px',
                borderTop: 'var(--Grid-borderWidth) solid',
                borderLeft: 'var(--Grid-borderWidth) solid',
                borderColor: 'divider',
                '& > div': {
                    borderRight: 'var(--Grid-borderWidth) solid',
                    borderBottom: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                },
            }}>
                <Item><Converastions/></Item>
            </Grid>
            <Grid item xs={9} overflow={"hidden"} height={'100%'}>
                <Item><ChatWindow/></Item>
            </Grid>
        </Grid>
        </Box>
    </AuthenticatedView>
}