import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    ActivationMessage,
    AddParticipantDTO,
    Conversation,
    ConversationAdd,
    ConvResponseDTO,
    SimpleMessageDTO
} from "./types";
import {apiFetch, AuthorizationLevel} from "../../core/apiFetch";
import {UserChatData} from "../../core/components/types";

export const getConversations = createAsyncThunk<Conversation[], void, {}>(
  "conv/get",
  async (_, thunkAPI) => {
    try {
      return await apiFetch<Conversation[]>(`/convs`, {
        requestConfig: {
          method: "GET",
          withCredentials: true,
        },
      }, AuthorizationLevel.AUTHORIZED);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const leaveConversation = createAsyncThunk<void, string, {}>(
  "conv/delete",
  async (conv, thunkAPI) => {
    try {
      await apiFetch(`/convs/${conv}`, {
        requestConfig: {
          method: "DELETE",
          withCredentials: true,
        },
      }, AuthorizationLevel.AUTHORIZED);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteUserFromConv = createAsyncThunk<void, {convID: string, userID: string }, {}>(
    "conv/deleteUser",
    async (ids, thunkAPI) => {
        try {
            await apiFetch(`/convs/${ids.convID}/${ids.userID}`, {
                requestConfig: {
                    method: "DELETE",
                    withCredentials: true,
                },
            }, AuthorizationLevel.AUTHORIZED);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const addConversation = createAsyncThunk<string, ConversationAdd, {}>(
  "conv/add",
  async (data, thunkAPI) => {
    try {
      return await apiFetch<string>("/convs", {
        requestConfig: {
          method: "POST",
          withCredentials: true,
          data: JSON.stringify({
              name: data.name,
              participants: data.participants.map(participant => participant.id),
              userID: data.userID
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      }, AuthorizationLevel.AUTHORIZED);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getConvData = createAsyncThunk<ConvResponseDTO, string, {}>(
    "conv/getById",
    async (id, thunkAPI) => {
        try {
            return await apiFetch<ConvResponseDTO>(`/convs/${id}`, {
                requestConfig: {
                    method: "GET",
                    withCredentials: true,
                },
            }, AuthorizationLevel.AUTHORIZED);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const addMessageToConversation = createAsyncThunk<
    SimpleMessageDTO,
    SimpleMessageDTO,
    {}
>("conversations/addMessage", async (data, thunkAPI) => {
    return data;
});

export const onConvReceived = createAsyncThunk<Conversation, Conversation, {}>(
    "conversations/received",
    async (data, thunkAPI) => {
        return data;
    }
);

export const addParticipant = createAsyncThunk<UserChatData, AddParticipantDTO, {}>(
    "conversations/addParticipant",
    async (data, thunkAPI) => {
        try {
            return apiFetch<UserChatData>(`/convs/addParticipant`, {
                requestConfig: {
                    withCredentials: true,
                    method: "POST",
                    params: {
                        convID: data.convID,
                        userID: data.userID
                    }
                }
            })
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const setConvStatus = createAsyncThunk<ActivationMessage, ActivationMessage, {}>(
    "conversations/setStatus",
    async (data) => {
        return data;
    }
)