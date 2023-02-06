import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiFetch, AuthorizationLevel} from "../../core/apiFetch";
import {Friend} from "./types";

export const addFriend = createAsyncThunk<void, Friend, {}>(
  "friends/add",
  async (user, thunkAPI) => {
    try {
      await apiFetch(
        `/api/friends/${user.id}`,
        {
          requestConfig: {
            method: "POST",
            withCredentials: true,
          },
        },
        AuthorizationLevel.UNAUTHORIZED
      );
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteFriends = createAsyncThunk<void, readonly string[], {}>(
  "friends/delete",
  async (ids, thunkAPI) => {
    try {
      await apiFetch("/friends", {
        requestConfig: {
          method: "DELETE",
          data: JSON.stringify(ids),
          withCredentials: true,
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

export const getFriends = createAsyncThunk<Friend[], void, {}>(
  "friends/get",
  async (_, thunkAPI) => {
    try {
      return await apiFetch<Friend[]>("/friends", {
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
