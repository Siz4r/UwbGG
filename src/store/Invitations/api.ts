import {createAsyncThunk} from "@reduxjs/toolkit";
import {Invitation} from "./types";
import {apiFetch, AuthorizationLevel} from "../../core/apiFetch";
import {UserData} from "../../core/components/types";

export const getInvitations = createAsyncThunk<Invitation[], void, {}>(
  "invitation/get",
  async (_, thunkAPI) => {
    try {
        return await apiFetch<Invitation[]>(`/invitation`, {
          requestConfig: {
              method: "GET",
              withCredentials: true
          }
      }, AuthorizationLevel.AUTHORIZED);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const rejectInvitation = createAsyncThunk<void, string, {}>(
  "invitation/reject",
  async (invId, thunkAPI) => {
    try {
      await apiFetch<void>(`/invitation/reject/${invId}`, {
        requestConfig: {
          withCredentials: true,
          method: "PATCH",
        },
      }, AuthorizationLevel.AUTHORIZED);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const acceptInvitation = createAsyncThunk<UserData, string, {}>(
  "invitation/accept",
  async (invId, thunkAPI) => {
    try {
      return await apiFetch<UserData>(`/invitation/accept/${invId}`, {
        requestConfig: {
          withCredentials: true,
          method: "PATCH",
        },
      }, AuthorizationLevel.AUTHORIZED);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const sendInvitation = createAsyncThunk<string, string, {}>(
  "invitation/send",
  async (toID, thunkAPI) => {
    try {
        return await apiFetch<string>(`/invitation/${toID}`, {
          requestConfig: {
              method: "POST",
              withCredentials: true,
          },
      }, AuthorizationLevel.AUTHORIZED);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
