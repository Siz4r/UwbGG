import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { UserData } from "../../core/components/types";

export const addFriend = createAsyncThunk<void, UserData, {}>(
  "friends/add",
  async (user, thunkAPI) => {
    try {
      console.log("cze");

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
      await apiFetch("/api/friends", {
        requestConfig: {
          method: "DELETE",
          data: JSON.stringify(ids),
          withCredentials: true,
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

export const getFriends = createAsyncThunk<UserData[], void, {}>(
  "friends/get",
  async (_, thunkAPI) => {
    try {
      return await apiFetch<UserData[]>("/api/friends", {
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
