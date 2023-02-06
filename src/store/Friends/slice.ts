import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {addFriend, deleteFriends, getFriends} from "./api";
import {Friend} from "./types";

interface IFriendsSlice {
  friends: Friend[];
  isLoading: boolean;
}

export const friendsSlice = createSlice<IFriendsSlice, {}>({
  name: "friends",
  initialState: {
    friends: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFriend.fulfilled, (state, action) => {
      state.friends = [...state.friends, action.meta.arg];
    });

    builder.addCase(deleteFriends.fulfilled, (state, action) => {
      state.friends = state.friends.filter(
        (f) => !action.meta.arg.includes(f.id)
      );
    });

    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.friends = action.payload;
    });

    builder.addMatcher(
      isAnyOf(getFriends.pending, deleteFriends.pending, addFriend.pending),
      (state) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getFriends.fulfilled,
        getFriends.rejected,
        deleteFriends.fulfilled,
        deleteFriends.rejected,
        addFriend.rejected,
        addFriend.fulfilled
      ),
      (state) => {
        state.isLoading = false;
      }
    );
  },
});
