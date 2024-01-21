import { ConvChatDto, Conversation, MessageConvDTO } from './types'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  addMessageToConversation,
  deleteUserFromConv,
  getConvData,
  getConversations,
  leaveConversation,
  onConvReceived,
  setConvStatus,
} from './api'
import { isBoolean } from '../../core/isBoolean'

interface IConvsSlice {
  convs: Conversation[];
  isLoading: boolean;
}

export const convsSlice = createSlice<IConvsSlice, {}>({
  name: "convs",
  initialState: {
    convs: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.convs = action.payload;
    });

    builder.addCase(getConvData.fulfilled, (state, action) => {
      state.convs = state.convs.map(conv => action.meta.arg === conv.id ? {
        ...conv,
        convDetails: action.payload
      }: conv)
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

    // builder.addCase(addMessageToConversation.fulfilled, (state, action) => {
    //   const message = action.payload
    //   let url = ''
    //   state.openedConv = {...state.openedConv, messages: [...state.openedConv.messages, {...message, imageURL: url}] }
    //   const id = state.openedConv.id
    //   state.convs = state.convs.map(conv => {
    //     if (conv.id === id) {
    //       return {...conv, lastMessage: action.payload}
    //     } else return conv
    //   })
    //
    // });

    builder.addCase(onConvReceived.fulfilled, (state, action) => {
      state.convs = [...state.convs, action.payload]
    })


    builder.addMatcher(
      isAnyOf(
        getConversations.pending,
        leaveConversation.pending,
          getConvData.pending,
          addMessageToConversation.pending,
          onConvReceived.pending
      ),
      (state) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getConversations.fulfilled,
        getConversations.rejected,
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
