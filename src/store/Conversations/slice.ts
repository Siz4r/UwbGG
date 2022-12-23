import { Conversation } from "./types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addConversation, deleteConversation, getConversations } from "./api";

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

    builder.addCase(deleteConversation.fulfilled, (state, action) => {
      state.convs = state.convs.filter((c) => c.id !== action.meta.arg.id);
    });

    builder.addCase(addConversation.fulfilled, (state, action) => {
      state.convs = [
        ...state.convs,
        { ...action.meta.arg, id: action.payload, isActive: true },
      ];
    });

    builder.addMatcher(
      isAnyOf(
        getConversations.pending,
        deleteConversation.pending,
        addConversation.pending
      ),
      (state) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getConversations.fulfilled,
        getConversations.rejected,
        addConversation.rejected,
        addConversation.fulfilled,
        deleteConversation.fulfilled,
        deleteConversation.rejected
      ),
      (state) => {
        state.isLoading = false;
      }
    );
  },
});
