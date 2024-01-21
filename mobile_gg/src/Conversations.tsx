import {ConversationRow} from "./ConversationRow";
import {List} from "@mui/material";
import { Conversation } from './store/Conversations/types'

type Props = {
  setSelectedConvID: (id: string) => void
  convs: Conversation[]
}
export const Converastions = (props: Props) => {
  return (
    <List component="nav" aria-label="main mailbox folders">
      {props.convs.map((conv) => (
          <div onClick={() => props.setSelectedConvID(conv.id)} key={conv.id}>
        <ConversationRow
          name={conv.name}
          isActive={conv.active}
          lastMessage={conv.lastMessage}
          id={conv.id}
        />
          </div>
      ))}
    </List>
  );
};
