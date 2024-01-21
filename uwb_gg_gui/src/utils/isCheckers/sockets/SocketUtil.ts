//@ts-ignore
import { Client, Frame, Message, over } from 'stompjs'
import {Conversation, MessageResponseDTO} from "../../../store/Conversations/types";
import {addMessageToConversation, onConvReceived, setConvStatus} from "../../../store/Conversations/api";
//@ts-ignore
import SockJS from "sockjs-client";
import {useAppDispatch} from "../../../core/hooks/reduxHooks";

let stompClient: Client;
export const useSockets = () => {

    const dispatch = useAppDispatch();
    const onMessageReceived = (message: Message) => {
        const body: MessageResponseDTO = JSON.parse(message.body);

        if (body.simpleMessage) {
            dispatch(addMessageToConversation(body.data));
        } else {
            dispatch(setConvStatus(body.activationMessage))
        }
    };

    const connect = (convs: Conversation[], userID: string) => {
        if (stompClient) return;

        const Sock = new SockJS("http://localhost:8080/chat");
        stompClient = over(Sock);
        stompClient.connect({}, () => onConnected(convs, userID), (err: string | Frame) => console.log(err));
    }

    const onConnected = (convs: Conversation[], userID: string) => {
        convs.forEach((c) => {
            stompClient.subscribe(
                `/conversation/${c.id}/private`,
                onMessageReceived
            );
        });

        stompClient.subscribe(`/conversation/${userID}/new`, onNewConvGet);
    };

    const onNewConvGet = async (message: Message) => {
        const data: Conversation = JSON.parse(message.body);
        dispatch(onConvReceived(data));
        stompClient.subscribe(
            `/conversation/${data.id}/private`,
            onMessageReceived
        );
    };



    const sendMessage = async (conversationId: string, text: string, userID: string, file: ArrayBuffer | string) => {
        const message = {
            userID: userID,
            convID: conversationId,
            content: text,
            imageRawData: Array.from(new Uint8Array(file as ArrayBuffer))
        };

        stompClient.send(`/chat/sendMessage/`, {}, JSON.stringify(message));
    }

    return {
        sendMessage,
        connect
    }
}
