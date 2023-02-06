import {User, UserSearchDTO} from "./types";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  editData, getUsersByNick,
  loginWithCredentials,
  logout,
  newPassword,
  refreshToken,
  register,
} from "./api";
import storage from "redux-persist/lib/storage";
import { isBoolean } from "../../utils/isCheckers/isBoolean";

export type UserEntity = User | boolean;

export interface IuserSlice {
  searchUsers: UserSearchDTO[]
  user: UserEntity;
  loading: boolean;
}

export const userSlice = createSlice<IuserSlice, {}>({
  name: "user",
  initialState: {
    searchUsers: [],
    user: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithCredentials.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(newPassword.fulfilled, () => {});

    builder.addCase(editData.fulfilled, (state, action) => {
      if (!isBoolean(state.user)) {
        state.user = { ...state.user, ...action.meta.arg };
      }
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = false;
      // @ts-ignore
      state = {};
      storage.removeItem("persist:root").then((r) => {});
      localStorage.setItem("persist:root", "");
    });

    builder.addCase(getUsersByNick.fulfilled, (state, action) => {
      state.searchUsers = action.payload
    })

    builder.addCase(register.fulfilled, (state) => {
      state.user = false;
    });

    builder.addMatcher(
      isAnyOf(
        loginWithCredentials.pending,
        register.pending,
        editData.pending,
        newPassword.pending,
          getUsersByNick.pending
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        loginWithCredentials.rejected,
        loginWithCredentials.fulfilled,
        getUsersByNick.rejected,
        getUsersByNick.fulfilled,
        register.rejected,
        register.fulfilled,
        editData.fulfilled,
        editData.rejected,
        newPassword.rejected,
        newPassword.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
