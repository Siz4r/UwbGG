import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import storage from "redux-persist/lib/storage";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { LocalStorageKeys } from "../../types/LocalStorageKeys";
import {
  ApiAuthenticationResponse,
  ApiRegister,
  NewPassword,
  User,
  UserEditData,
} from "./types";
import { serializeUser } from "./serializer";

const userData: User = {
  friends: [],
  role: "",
  id: "1",
  firstName: "Kacper",
  lastName: "Tarasiuk",
  nick: "Siz4r",
  email: "zaq134215@wp.pl",
  convs: [
    {
      id: "1",
      name: "że tak powiem tak naprawde",
      isActive: true,
      lastMessage: {
        ownerId: "1",
        content: "28 dni temu pierdolone żule",
        nick: "Szulborak",
        sendTime: new Date("02-11-2022"),
      },
    },
    {
      id: "2",
      name: "że tak powiem tak naprawde",
      isActive: true,
      lastMessage: {
        ownerId: "1",
        content: "28 dni temu pierdolone żule",
        nick: "Szulborak",
        sendTime: new Date("02-11-2022"),
      },
    },
    {
      id: "3",
      name: "że tak powiem tak naprawde",
      isActive: true,
      lastMessage: {
        ownerId: "1",
        content: "28 dni temu pierdolone żule",
        nick: "Szulborak",
        sendTime: new Date("02-11-2022"),
      },
    },
    {
      id: "4",
      name: "że tak powiem tak naprawde",
      isActive: true,
      lastMessage: {
        ownerId: "1",
        content: "28 dni temu pierdolone żule",
        nick: "Szulborak",
        sendTime: new Date("02-11-2022"),
      },
    },
    {
      id: "5",
      name: "że tak powiem tak naprawde",
      isActive: true,
      lastMessage: {
        ownerId: "1",
        content: "28 dni temu pierdolone żule",
        nick: "Szulborak",
        sendTime: new Date(),
      },
    },
    {
      id: "6",
      name: "że tak powiem tak naprawde",
      isActive: true,
      lastMessage: {
        ownerId: "1",
        content: "28 dni temu pierdolone żule",
        nick: "Szulborak",
        sendTime: new Date(),
      },
    },
  ],
};
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
    user: serializeUser(userData, role.ROLE),
    accessToken,
  };
});

export const loginWithCredentials = createAsyncThunk<
  {
    user: User;
    accessToken: string;
  },
  {
    username: string;
    password: string;
  },
  {}
>("user/loginWithCredentials", async ({ username, password }, thunkAPI) => {
  try {
    // const response = await apiFetch<ApiAuthenticationResponse>("/auth/login", {
    //   requestConfig: {
    //     method: "POST",
    //     data: JSON.stringify({ username, password }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //   },
    // });
    //
    // const { accessToken, user } = response;
    // const role: { ROLE: string } = jwtDecode(accessToken);
    // // Set access token
    // localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
    // return {
    //   user: serializeUser(userData, role.ROLE),
    //   accessToken,
    // };
    return {
      user: serializeUser(userData, "rola"),
      accessToken: "token",
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
        "/auth/register/",
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
      // await apiFetch(
      //   "/auth/logout/",
      //   {
      //     requestConfig: {
      //       method: "POST",
      //       withCredentials: true,
      //     },
      //   },
      //   AuthorizationLevel.AUTHORIZED
      // );
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
      await apiFetch("/user/edit/", {
        requestConfig: {
          method: "PUT",
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

export const newPassword = createAsyncThunk<void, NewPassword, {}>(
  "user/newPassword",
  async (data, thunkAPI) => {
    try {
      await apiFetch("/user/newPassword/", {
        requestConfig: {
          method: "PUT",
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
