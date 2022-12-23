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
  friends: [
    {
      id: "00479e33-5e4b-4610-a5c8-f9803a01dd84",
      firstName: "Camilla",
      lastName: "Saffe",
      nick: "accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit",
      role: "Subcontractor",
    },
    {
      id: "ce0469b1-a470-4519-92f7-482207bad3e6",
      firstName: "Gawen",
      lastName: "Hadlow",
      nick: "sapien quis libero nullam sit amet turpis elementum",
      role: "Electrician",
    },
    {
      id: "7ee14c86-f162-4877-b408-11bd1d19cb91",
      firstName: "Desirae",
      lastName: "Reynolds",
      nick: "dictumst aliquam augue quam sollicitudin",
      role: "Estimator",
    },
    {
      id: "4324dd65-3ac5-452b-a6f0-db20c0958771",
      firstName: "Gwyneth",
      lastName: "Worman",
      nick: "ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit",
      role: "Electrician",
    },
    {
      id: "daf8031a-b2dd-4474-be17-f54b30456b7c",
      firstName: "Baxter",
      lastName: "Laidler",
      nick: "potenti nullam porttitor lacus at turpis donec posuere metus",
      role: "Construction Worker",
    },
    {
      id: "4a99ca0c-1a10-4b0d-aa88-6a20b87e4fa2",
      firstName: "Frederique",
      lastName: "Moxham",
      nick: "leo pellentesque ultrices mattis odio donec vitae nisi",
      role: "Estimator",
    },
    {
      id: "e2464522-21ee-40a4-bd80-6d9241fc077a",
      firstName: "Jacobo",
      lastName: "Riply",
      nick: "molestie nibh in lectus pellentesque at nulla suspendisse",
      role: "Subcontractor",
    },
    {
      id: "6a3301fb-4bfb-4c10-9d20-4f14c983a42d",
      firstName: "Kristo",
      lastName: "Reiling",
      nick: "nulla sed vel enim sit amet nunc",
      role: "Surveyor",
    },
    {
      id: "d3c1600b-8189-41bf-894a-77395e43183b",
      firstName: "Sarena",
      lastName: "Blagbrough",
      nick: "duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim",
      role: "Subcontractor",
    },
    {
      id: "12a96d55-ab47-46fc-a329-cd06cca04427",
      firstName: "Hillie",
      lastName: "Hamson",
      nick: "ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo",
      role: "Surveyor",
    },
    {
      id: "661f0a82-1b23-431d-af39-b95c26994292",
      firstName: "Leon",
      lastName: "Arnli",
      nick: "ligula pellentesque ultrices phasellus id sapien in sapien",
      role: "Construction Worker",
    },
    {
      id: "edde398b-d4b9-4e9a-9c20-c4b2cc236ecb",
      firstName: "Gayleen",
      lastName: "Callicott",
      nick: "neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus",
      role: "Project Manager",
    },
    {
      id: "6ef3bef3-6dc3-4d0c-96b9-d89b094d8d7f",
      firstName: "Ardith",
      lastName: "Pardue",
      nick: "nisi vulputate nonummy maecenas tincidunt lacus at",
      role: "Supervisor",
    },
    {
      id: "5608c0cf-afb5-4ab3-9037-81bc0b064623",
      firstName: "Erroll",
      lastName: "Andrelli",
      nick: "ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac",
      role: "Project Manager",
    },
    {
      id: "572fd26f-ccce-4330-857b-24d648e49d24",
      firstName: "Tabor",
      lastName: "Fraczak",
      nick: "velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque",
      role: "Construction Foreman",
    },
    {
      id: "b07f854b-2dde-40f0-8079-2d7844a0ed57",
      firstName: "Amber",
      lastName: "Monelle",
      nick: "sit amet cursus id turpis integer aliquet massa id lobortis",
      role: "Surveyor",
    },
    {
      id: "86927c16-1c5c-4830-94f7-9abfc081ff79",
      firstName: "Marianna",
      lastName: "Librey",
      nick: "lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis",
      role: "Surveyor",
    },
    {
      id: "07ba0598-9fcb-45fa-a537-b0c4bc6452e5",
      firstName: "Joletta",
      lastName: "Fontin",
      nick: "donec odio justo sollicitudin ut suscipit a feugiat",
      role: "Project Manager",
    },
    {
      id: "e0af09a0-f3df-4d53-bbfa-5406e895ca8d",
      firstName: "Ram",
      lastName: "Rupp",
      nick: "interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis",
      role: "Architect",
    },
    {
      id: "262195b3-d908-4abb-9ec9-ba2fa674c26f",
      firstName: "Vikki",
      lastName: "Donner",
      nick: "nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla",
      role: "Engineer",
    },
  ],
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
      participants: [],
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
      participants: [],
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
      participants: [],
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
      participants: [],
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
      participants: [],
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
      participants: [],
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
