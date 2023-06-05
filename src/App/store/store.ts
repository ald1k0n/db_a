import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { commandsAPI } from "../../Entities/Command";
import { historyAPI } from "../../Entities/History";
import { authApi, auth } from "../../Entities/Auth";
import reportslice from "App/reportslice";

const rootReducer = combineReducers({
  [commandsAPI.reducerPath]: commandsAPI.reducer,
  [historyAPI.reducerPath]: historyAPI.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth,
  reportslice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(commandsAPI.middleware)
        .concat(historyAPI.middleware)
        .concat(authApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
