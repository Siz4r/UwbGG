import { createAsyncThunk } from "@reduxjs/toolkit";
import { Conversation, ConversationAdd } from "./types";
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

export const deleteConversation = createAsyncThunk<void, Conversation, {}>(
  "conv/delete",
  async (conv, thunkAPI) => {
    try {
      await apiFetch(`/api/convs/${conv.id}`, {
        requestConfig: {
          method: "DELETE",
          withCredentials: true,
        },
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addConversation = createAsyncThunk<string, ConversationAdd, {}>(
  "conv/add",
  async (data, thunkAPI) => {
    try {
      return await apiFetch<string>("/api/convs", {
        requestConfig: {
          method: "POST",
          withCredentials: true,
          data: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
