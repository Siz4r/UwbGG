import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from "./Users/slice";
import { logout } from "./Users/api";
import { invitationSlice } from "./Invitations/slice";
import { friendsSlice } from "./Friends/slice";
import { convsSlice } from "./Conversations/slice";

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  user: userSlice.reducer,
  invitations: invitationSlice.reducer,
  friends: friendsSlice.reducer,
  convs: convsSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logout) {
    storage.removeItem("persist:root");

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
