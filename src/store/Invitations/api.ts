import { createAsyncThunk } from "@reduxjs/toolkit";
import { Invitation, SendRequestDTO } from "./types";
import { apiFetch } from "../../core/apiFetch";
import INVITATIONS from "../../invitations.json";

const invs: Invitation[] = INVITATIONS.map((inv) => ({
  id: inv.id + "",
  nick: inv.nick,
  sendDate: new Date(inv.sendDate),
}));

export const getInvitations = createAsyncThunk<Invitation[], void, {}>(
  "invitation/get",
  async (_, thunkAPI) => {
    try {
      // const response = await apiFetch<Invitation[]>(`/api/invitation/`, {
      //     requestConfig: {
      //         method: "GET",
      //         withCredentials: true
      //     }
      // })
      //
      // return response;
      return invs;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const rejectInvitation = createAsyncThunk<void, string, {}>(
  "invitation/reject",
  async (invId, thunkAPI) => {
    try {
      // await apiFetch<void>(`/invitation/reject/${invId}`, {
      //   requestConfig: {
      //     withCredentials: true,
      //     method: "PATCH",
      //   },
      // });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const acceptInvitation = createAsyncThunk<void, string, {}>(
  "invitation/accept",
  async (invId, thunkAPI) => {
    try {
      // await apiFetch<void>(`/invitation/accept/${invId}`, {
      //   requestConfig: {
      //     withCredentials: true,
      //     method: "PATCH",
      //   },
      // });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const sendInvitation = createAsyncThunk<string, SendRequestDTO, {}>(
  "invitation/send",
  async (data, thunkAPI) => {
    try {
      const response = await apiFetch<string>(`/api/invitation`, {
        requestConfig: {
          method: "POST",
          withCredentials: true,
          data: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      });

      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
