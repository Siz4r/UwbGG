import {useCallback, useState} from "react";
import {Avatar, Box, Grid, ImageListItem, Paper, Typography} from "@mui/material";
import {useConvs} from "../hooks/Invitations/useConvs";
import {isBoolean} from "../../utils/isCheckers/isBoolean";
import {styled} from "@mui/material/styles";
import {Image} from "@mui/icons-material";

type Props = {
    userID: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: '#ff9800',
}));

export const Messages = (props: Props) => {
    const setRef = useCallback((node: any) => {
        if (node) {
            node.scrollIntoView({ smooth: true });
        }
    }, []);

    const {convData} = useConvs({ fetchOnMount: false})

    if (isBoolean(convData)) {
        return <div></div>
    }

    return (
        <Grid container sx={{ flexDirection: 'column', flexGrow: 1, overflow: 'auto', backgroundColor: '#121212'}}>
                <Grid item sx={{flexDirection: 'column',
                    alignItems: 'flex-start', justifyContent: 'flex-end', px: 3, backgroundColor: '#121212'}}>
                    {convData.messages.map((message, index) => {
                        const lastMessage =
                            convData.messages.length - 1 === index;
                        const fromMe = message.ownerId === props.userID
                        return (
                            <Grid container
                                ref={lastMessage ? setRef : null}
                                key={index}
                                  sx={{ my: 1, flexDirection: 'column'}}
                                  alignItems={fromMe ? 'flex-end' : 'flex-start'}
                            >
                                <StyledPaper>
                                    <Grid container
                                          flexGrow={'0'}
                                          spacing={2}
                                          alignItems={"flex-start"}
                                          flexDirection={'row'}
                                          width={"auto"}>
                                        <Grid item  color={'#ff9800'} alignItems={'flex-end'}>
                                            <Avatar color={'#ff9800'}>{message.nick.charAt(0)}</Avatar>
                                        </Grid>

                                        <Grid item>
                                            <Grid container flexDirection={'column'} alignItems={fromMe ? 'flex-end' : 'flex-start'}>
                                                {message.imageURL && <Box
                                                    component="img"
                                                    sx={{
                                                        maxHeight: { xs: 233, md: 167 },
                                                        maxWidth: { xs: 350, md: 250 },
                                                    }}
                                                    alt="The house from the offer."
                                                    src={message.imageURL}
                                                />}
                                                <Grid item xs>
                                                    <Typography variant={'h5'}>{message.content}</Typography>
                                                </Grid>
                                                <Grid item xs sx={{
                                                }}>
                                                    <Typography fontSize={14}>
                                                    {fromMe
                                                    ? "Ty, " + new Date(message.sendTime).toDateString()
                                                        : `${
                                                    message.nick
                                                }, ${new Date(message.sendTime).toDateString()
                                                        }`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </StyledPaper>
                            </Grid>
                        );
                    })}
                </Grid>
        </Grid>
    );
};