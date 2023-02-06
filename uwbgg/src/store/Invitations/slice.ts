import { Invitation } from "./types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  acceptInvitation,
  getInvitations,
  rejectInvitation,
  sendInvitation,
} from "./api";

export interface IinvitationSlice {
  invitations: Invitation[];
  loading: boolean;
}

export const invitationSlice = createSlice<IinvitationSlice, {}>({
  name: "invitation",
  initialState: {
    invitations: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(rejectInvitation.fulfilled, (state, action) => {
      state.invitations = state.invitations.filter(
        (inv) => inv.id !== action.meta.arg
      );
    });

    builder.addCase(acceptInvitation.fulfilled, (state, action) => {
      state.invitations = state.invitations.filter(
        (inv) => inv.id !== action.meta.arg
      );
    });

    builder.addCase(getInvitations.fulfilled, (state, action) => {
      state.invitations = action.payload;
    });

    builder.addCase(sendInvitation.fulfilled, () => {});

    builder.addMatcher(
      isAnyOf(
        rejectInvitation.fulfilled,
        rejectInvitation.rejected,
        acceptInvitation.rejected,
        acceptInvitation.fulfilled,
        getInvitations.fulfilled,
        getInvitations.rejected,
        sendInvitation.rejected,
        sendInvitation.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        rejectInvitation.pending,
        acceptInvitation.pending,
        getInvitations.pending,
        sendInvitation.pending
      ),
      (state) => {
        state.loading = true;
      }
    );
  },
});
