import { createAsyncThunk } from "@reduxjs/toolkit";
import { Conversation } from "./types";
import { apiFetch } from "../../core/apiFetch";

export const getConversations = createAsyncThunk<Conversation[], string, {}>(
  "conv/get",
  async (userId, thunkAPI) => {
    try {
      return await apiFetch<Conversation[]>(`/convs/${userId}`, {
        requestConfig: {
          method: "GET",
          withCredentials: true,
        },
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
