import { createAsyncThunk } from '@reduxjs/toolkit'

export const setUser = createAsyncThunk<string, string, {}>(
  "conv/delete",
  async (nick, thunkAPI) => {
    try {
      if (!nick || nick.length < 5) {
        return thunkAPI.rejectWithValue('Wrong nickname!');
      }
      return nick;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
