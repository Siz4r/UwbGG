import { ConversationRow } from "./ConversationRow";
import { List } from "@mui/material";
import { Conversation } from "../../store/Conversations/types";

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date("02-11-2022"),
    },
    participants: [],
  },
  {
    id: "2",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date("02-11-2022"),
    },
    participants: [],
  },
  {
    id: "3",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date("02-11-2022"),
    },
    participants: [],
  },
  {
    id: "4",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date("02-11-2022"),
    },
    participants: [],
  },
  {
    id: "5",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date(),
    },
    participants: [],
  },
  {
    id: "6",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date(),
    },
    participants: [],
  },
  {
    id: "7",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date(),
    },
    participants: [],
  },
  {
    id: "8",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date(),
    },
    participants: [],
  },
  {
    id: "9",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date(),
    },
    participants: [],
  },
  {
    id: "10",
    name: "że tak powiem tak naprawde",
    isActive: true,
    lastMessage: {
      ownerId: "1",
      content: "28 dni temu pierdolone żule",
      nick: "Szulborak",
      sendTime: new Date(),
    },
    participants: [],
  },
];

export const Converastions = () => {
  return (
    <List component="nav" aria-label="main mailbox folders">
      {CONVERSATIONS.map((conv) => (
        <ConversationRow
          name={conv.name}
          isActive={conv.isActive}
          lastMessage={conv.lastMessage}
          id={conv.id}
        />
      ))}
    </List>
  );
};
