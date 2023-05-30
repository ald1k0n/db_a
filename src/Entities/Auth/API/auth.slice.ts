import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "Shared";
import { authApi } from "./auth.api";

interface IUserState {
  user: IUser | null;
  userToken: string | null;
}

const userToken = localStorage.getItem("uid")
  ? localStorage.getItem("uid")
  : null;

const initialState: IUserState = {
  user: null,
  userToken,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("uid");
      state.user = null;
      state.userToken = null;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      console.log(action.payload);
      state.userToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.refresh.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
  },
});

export const { logout, setUser, setToken } = slice.actions;
export const auth = slice.reducer;
