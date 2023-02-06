import {createAsyncThunk} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import storage from "redux-persist/lib/storage";
import {apiFetch, AuthorizationLevel} from "../../core/apiFetch";
import {LocalStorageKeys} from "../../types/LocalStorageKeys";
import {ApiAuthenticationResponse, ApiRegister, NewPassword, User, UserEditData, UserSearchDTO,} from "./types";

import {serializeUser} from "./serializer";

export const refreshToken = createAsyncThunk<
  {
    user: User;
    accessToken: string;
  },
  void,
  {}
>("user/refreshToken", async (_) => {
  const response = await apiFetch<ApiAuthenticationResponse>(
    "/auth/refresh_token",
    {
      requestConfig: {
        method: "POST",
        withCredentials: true,
      },
    }
  );

  const { accessToken, user } = response;
  const role: { ROLE: string } = jwtDecode(accessToken);
  // Update access token
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, response.accessToken);

  return {
    user: serializeUser(user, role.ROLE),
    accessToken,
  };
});

export const loginWithCredentials = createAsyncThunk<
  {
    user: User;
    accessToken: string;
  },
  {
    nick: string;
    password: string;
  },
  {}
>("user/loginWithCredentials", async ({ nick, password }, thunkAPI) => {
  try {
    const response = await apiFetch<ApiAuthenticationResponse>("/auth/login", {
      requestConfig: {
        method: "POST",
        data: JSON.stringify({ nick, password }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    });

    const { accessToken, user } = response;
    const role: { ROLE: string } = jwtDecode(accessToken);
    // Set access token
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
    return {
      user: serializeUser(user, role.ROLE),
      accessToken,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const register = createAsyncThunk<void, ApiRegister, {}>(
  "user/register",
  async (data, thunkAPI) => {
    try {
      await apiFetch(
        "/auth/register",
        {
          requestConfig: {
            method: "POST",
            withCredentials: true,
            data: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          },
        },
        AuthorizationLevel.UNAUTHORIZED
      );
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk<void, void, {}>(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await apiFetch(
        "/auth/logout",
        {
          requestConfig: {
            method: "POST",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );
      localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
      storage.removeItem("persist:root");
      localStorage.removeItem("persist:root");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editData = createAsyncThunk<void, UserEditData, {}>(
  "user/editData",
  async (data, thunkAPI) => {
    try {
      await apiFetch("/user", {
        requestConfig: {
          method: "PUT",
          withCredentials: true,
          data: JSON.stringify(data),
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

export const newPassword = createAsyncThunk<void, NewPassword, {}>(
  "user/newPassword",
  async (data, thunkAPI) => {
    try {
      await apiFetch("/user/newPassword", {
        requestConfig: {
          method: "PUT",
          withCredentials: true,
          data: JSON.stringify(data),
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

export const getUsersByNick = createAsyncThunk<UserSearchDTO[], string, {}>(
    "user/getByNick",
    async (nick, thunkAPI) => {
        try {
            return await apiFetch<UserSearchDTO[]>(`/user/${nick}`, {
                requestConfig: {
                    method: "GET",
                    withCredentials: true
                }
            }, AuthorizationLevel.AUTHORIZED)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
