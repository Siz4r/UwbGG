import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { setUser } from './api'

interface IConvsSlice {
  nickname?: string;
  isLoading: boolean;
}

export const userSlice = createSlice<IConvsSlice, {}>({
  name: "convs",
  initialState: {
    nickname: undefined,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.nickname = action.payload
    })

    builder.addMatcher(isAnyOf(setUser.pending), state => {
      state.isLoading = true
    })

    builder.addMatcher(isAnyOf(setUser.fulfilled, setUser.rejected), state => {
      state.isLoading = false
    })
  }
})