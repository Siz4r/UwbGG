import React, {useCallback, useContext, useState} from "react";
import dayjs from "dayjs";
import {useConvs} from "../hooks/Invitations/useConvs";

var stompClient = null;

const ConversationsContext = React.createContext();

export const useConversations = () => {
    return useContext(ConversationsContext);
};

export function ConversationsProvider({ id, children }) {
    const { convs } = useConvs();

    const [conversations, setConversations] = useState(convs);

    if (conversations.length < convs.length) {
        setConversations(convs);
    }

    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

    const addMessageToConversation = useCallback(
        ({ conversationId, text, senderId, createdAt }) => {
            setConversations((prevConversations) => {
                const newMessage = {
                    senderId,
                    text,
                    createdAt: dayjs(createdAt).toDate(),
                };
                const newConversations = prevConversations.map((conversation) => {
                    if (conversation.conversationId === conversationId) {
                        return {
                            ...conversation,
                            messages: [...conversation.messages, newMessage],
                        };
                    }

                    return conversation;
                });

                return newConversations;
            });
        },
        [setConversations]
    );

    // useEffect(async () => {
    //   // if (convs.length === conversations.length) {
    //   // connect();
    //   // if (stompClient == null) return;
    //   // }
    //   // setConversations(convs);
    // }, [stompClient, addMessageToConversation, setConversations]);

    // function connect() {
    //   const Sock = new SockJS("http://localhost:5000/chat");
    //   stompClient = over(Sock);
    //   stompClient.connect({}, onConnected, (err) => console.log(err));
    // }

    // const onConnected = () => {
    //   conversations.forEach((c) => {
    //     stompClient.subscribe(
    //       `/conversation/${c.conversationId}/private`,
    //       onMessageReceived
    //     );
    //   });
    //   stompClient.subscribe(`/conversation/${id}/new`, onNewConvGet);
    // };

    // const onNewConvGet = async (payload) => {
    //   onConvGet(payload);
    //   const data = JSON.parse(payload.body);
    //   stompClient.subscribe(
    //     `/conversation/${data.conversationId}/private`,
    //     onMessageReceived
    //   );
    // };

    // function sendMessage(conversationId, text) {
    //   const message = {
    //     convID: conversationId,
    //     senderID: id,
    //     content: text,
    //   };

    //   stompClient.send(`/app/conversationMessage/`, {}, JSON.stringify(message));
    // }

    const formattedConversations = conversations.map((conversation, index) => {

        // console.log(dayjs(conversation.messages[0].createdAt).toDate().getTime());
        const messages = conversation.messages
            .map((message) => {
                const fromMe = id === message.senderId;
                return {
                    ...message,
                    senderName: 'elo',
                    fromMe,
                    createdAt: dayjs(message.createdAt).toDate(),
                };
            })
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

        const selected = index === selectedConversationIndex;
        return { ...conversation, messages, selected };
    });

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        // sendMessage,
        selectConversationIndex: setSelectedConversationIndex,

    };

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    );
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false;
    const arr1 = [...a];
    const arr2 = [...b];
    arr1.sort();
    arr2.sort();

    return arr1.every((element, index) => {
        return element === arr2[index];
    });
}