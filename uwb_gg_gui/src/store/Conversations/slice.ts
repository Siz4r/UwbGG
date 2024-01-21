import {ConvChatDto, Conversation, MessageConvDTO} from "./types";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {
  addConversation,
  addMessageToConversation, addParticipant,
  deleteUserFromConv,
  getConvData,
  getConversations,
  leaveConversation,
  onConvReceived, setConvStatus
} from "./api";
import {isBoolean} from "../../utils/isCheckers/isBoolean";

interface IConvsSlice {
  convs: Conversation[];
  openedConv: ConvChatDto | boolean;
  isLoading: boolean;
}

export const convsSlice = createSlice<IConvsSlice, {}>({
  name: "convs",
  initialState: {
    convs: [],
    openedConv: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.convs = action.payload;
    });

    builder.addCase(leaveConversation.fulfilled, (state, action) => {
      state.convs = state.convs.filter((c) => c.id !== action.meta.arg);
      state.openedConv = false
    });

    builder.addCase(deleteUserFromConv.fulfilled, (state, action) => {
      if (!isBoolean(state.openedConv)) {
        state.openedConv.participants = state.openedConv.participants.filter(participant => participant.id !== action.meta.arg.userID)
      }
    })

    builder.addCase(addConversation.fulfilled, () => {});

    builder.addCase(getConvData.fulfilled, (state, action) => {
      const mappedMessage: MessageConvDTO[] = action.payload.messages
          .map(message => {
            let url = ''
            if (message.imageRawData && message.imageRawData.length > 0) {
              const blob = new Blob([new Uint8Array(message.imageRawData)], { type: "image/jpeg" } )
              url = URL.createObjectURL(blob)
            }

            return {
              id: message.id,
              ownerId: message.ownerId,
              nick: message.nick,
              content: message.content,
              sendTime: message.sendTime,
              imageURL: url
            }
          })
      state.openedConv = {...action.payload, messages: mappedMessage};
    })

    builder.addCase(setConvStatus.fulfilled, (state, action) => {
      state.convs = state.convs
          .map(conv => {
            if (conv.id === action.payload.convID) return {
              ...conv,
              active: action.payload.active
            }; else return conv
          })
    })

    builder.addCase(addMessageToConversation.fulfilled, (state, action) => {
      if (!isBoolean(state.openedConv)) {
        const message = action.payload
        let url = ''
        if (message.imageRawData && message.imageRawData.length > 0) {
          const blob = new Blob([new Uint8Array(message.imageRawData)], { type: "image/jpeg" } )
          url = URL.createObjectURL(blob)
        }
        state.openedConv = {...state.openedConv, messages: [...state.openedConv.messages, {...message, imageURL: url}] }
        const id = state.openedConv.id
        state.convs = state.convs.map(conv => {
          if (conv.id === id) {
            return {...conv, lastMessage: action.payload}
          } else return conv
        })
      }
    });

    builder.addCase(onConvReceived.fulfilled, (state, action) => {
      state.convs = [...state.convs, action.payload]
    })

    builder.addCase(addParticipant.fulfilled, (state, action) => {
      if (!isBoolean(state.openedConv)) {
        state.openedConv.participants = [...state.openedConv.participants, action.payload]
      }
    })

    builder.addMatcher(
      isAnyOf(
        getConversations.pending,
        leaveConversation.pending,
        addConversation.pending,
          getConvData.pending,
          addMessageToConversation.pending,
          onConvReceived.pending,
          addParticipant.pending
      ),
      (state) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getConversations.fulfilled,
        getConversations.rejected,
        addParticipant.fulfilled,
        addParticipant.rejected,
        addConversation.rejected,
        addConversation.fulfilled,
        addMessageToConversation.rejected,
        addMessageToConversation.fulfilled,
        leaveConversation.fulfilled,
        leaveConversation.rejected,
          getConvData.fulfilled,
          getConvData.rejected,
          onConvReceived.fulfilled,
          onConvReceived.rejected
      ),
      (state) => {
        state.isLoading = false;
      }
    );
  },
});
