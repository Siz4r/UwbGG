import {AuthenticatedView} from "../../core/wrappers/AuthenticatedView";
import {Grid, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Converastions} from "../../core/components/Conversations";
import {useEffect, useState} from "react";
import {useConvs} from "../../core/hooks/Invitations/useConvs";
import {isBoolean} from "../../utils/isCheckers/isBoolean";
import {useSelectUser} from "../../core/hooks/SelectUser/SelectUser";
import {ChatWindow} from "../../core/components/ChatWindow";
import {useSockets} from "../../utils/isCheckers/sockets/SocketUtil";

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
    const [selectedConvID, setSelectedConvID] = useState('');
    const { connect } = useSockets()

    const { user } = useSelectUser();
    const { convs, isLoading } = useConvs({ fetchOnMount: true });

    useEffect(() => {
        if (!isBoolean(user) && !isLoading && convs) {
            connect(convs, user.id)
        }
    }, [convs, user])

    return <AuthenticatedView>
        <Box flex={1} height={'100%'} flexGrow={1} sx={{backgroundColor: '#121212'}}>
        <Grid container sx={{ height: '100%',backgroundColor: '#121212'}} overflow={'hidden'}>
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
                backgroundColor: '#121212'
            }}>
                <Item><Converastions setSelectedConvID={setSelectedConvID} convs={convs}/></Item>
            </Grid>
            {(selectedConvID || (convs[0] && convs[0].id)) &&
                (<Grid item xs={9} overflow={"hidden"} height={'100%'} sx={{backgroundColor: '#121212'}}>
                    <ChatWindow convID={selectedConvID ? selectedConvID : convs[0].id} />
            </Grid>)}
        </Grid>
        </Box>
    </AuthenticatedView>
}