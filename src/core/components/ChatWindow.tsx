import {Box, Grid, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import {ChatHeader} from "./ChatHeader";
import {ChatMessages} from "./ChatMessages";
import {useEffect, useState} from "react";
import {Participants} from "./Participants";
import {useConvs} from "../hooks/Invitations/useConvs";
import {useSelectUser} from "../hooks/SelectUser/SelectUser";
import {isBoolean} from "../../utils/isCheckers/isBoolean";
import {LoadingWrapper} from "../wrappers/LoadingWrapper";
import {useAppDispatch} from "../hooks/reduxHooks";
import {getConvData} from "../../store/Conversations/api";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#121212',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  overflow: "auto",
}));

const DarkBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#121212'
}))

type Props = {
  convID: string
}

export const ChatWindow = (props: Props) => {
  const [selectedView, setSelectedView] = useState<number>(0);
  const {user} = useSelectUser();
  const {convData, isLoading} = useConvs({fetchOnMount: false});
  const dispatch = useAppDispatch();
  const getView = () => {
    if (convData && !isBoolean(convData) && !isBoolean(user)) {
      if (selectedView === 0)
        return <ChatMessages userId={user.id} convID={props.convID}/>;
      if (selectedView === 1) return <Participants participants={convData.participants} convID={props.convID}/>;
    }
  };

  useEffect(() => {
    dispatch(getConvData(props.convID))
  }, [props.convID])

  if (isBoolean(convData) || isBoolean(user)) return <div></div>

  return (<LoadingWrapper isLoading={isBoolean(convData) || isLoading}>
        <DarkBox sx={{ height: "100%" }} overflow={"hidden"}>
      <Grid
        container
        sx={{ height: "100%", flexDirection: "column", backgroundColor: '#121212' }}
        overflow={"hidden"}
      >
        <Grid
          item
          sx={{
            height: "10%",
              borderLeft: 2,
              borderRight: 2,
              borderColor: '#ff9800',
              backgroundColor: '#121212'
          }}
          overflow={"hidden"}
        >
          <Item>
            {!isBoolean(convData) && !isBoolean(user) && <ChatHeader setView={setSelectedView} convName={convData.name} convID={convData.id}
                                                 userRole={convData.participants.find(p => p.id === user.id) ?
                                                     convData.participants.filter(p => p.id === user.id)[0].role : 'NORMAL'}/>}
          </Item>
        </Grid>
        {getView()}
      </Grid>
    </DarkBox></LoadingWrapper>
  );
};
