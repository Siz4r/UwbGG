import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { convsSlice } from './Conversations/slice'
import { userSlice } from './User/slice'

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  convs: convsSlice.reducer,
  user: userSlice.reducer
});

const rootReducer = (state: any, action: never) => {
  // if (action.type === logout) {
  //   storage.removeItem("persist:root");
  //
  //   return appReducer(undefined, action);
  // }

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
