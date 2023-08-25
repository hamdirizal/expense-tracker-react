import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../types";
import { AppDispatch } from "../store";
import { AuthUser, SupabaseClient } from "@supabase/supabase-js";

export interface UserState {
  auth_user: AuthUser | null;
  get_auth_user_loading: boolean;
  get_auth_user_error: string;
  user_logout_loading: boolean;
  user_logout_success: boolean;
  user_logout_error: string;
  user_login_loading: boolean;
  user_login_error: string;
  user_login_success: boolean;
}

const initialState: UserState = {
  auth_user: null,
  get_auth_user_loading: false,
  get_auth_user_error: "",
  user_logout_loading: false,
  user_logout_success: false,
  user_logout_error: "",
  user_login_loading: false,
  user_login_error: "",
  user_login_success: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAuthUserStart: (state: UserState) => {
      state.get_auth_user_loading = true;
      state.get_auth_user_error = "";
    },
    getAuthUserFail: (state: UserState) => {
      state.get_auth_user_loading = false;
      state.get_auth_user_error = "error happened";
    },
    getAuthUserSuccess: (
      state: UserState,
      action: PayloadAction<AuthUser | null>
    ) => {
      state.get_auth_user_loading = false;
      state.get_auth_user_error = "";
      state.auth_user = action.payload;
    },
    userLoginStart: (state: UserState) => {
      state.user_login_loading = true;
      state.user_login_error = "";
    },
    userLoginFail: (state: UserState) => {
      state.user_login_loading = false;
      state.user_login_error = "error happened";
    },
    userLoginSuccess: (
      state: UserState,
      action: PayloadAction<AuthUser | null>
    ) => {
      console.log("LOGIN SUCCESS USER AUTH", action.payload);
      state.user_login_loading = false;
      state.user_login_error = "";
      state.auth_user = action.payload || null;
    },
  },
});

export const getAuthUser = createAsyncThunk(
  "user/getAuthUser",
  async (supabase: SupabaseClient, { dispatch }) => {
    dispatch(getAuthUserStart());
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        dispatch(getAuthUserFail());
      } else {
        dispatch(getAuthUserSuccess(data.user));
      }
    } catch (error) {
      dispatch(getAuthUserFail());
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (
    payload: {
      supabase: SupabaseClient;
      email: string;
      password: string;
    },
    {dispatch}
  ) => {
    dispatch(userLoginStart())
    try {
      const { data, error } = await payload.supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
      if (error) {
        dispatch(userLoginFail())
      } else {
        const { data, error } = await payload.supabase.auth.getUser();
        if (error) {
          dispatch(userLoginFail())
        } else {
          dispatch(userLoginSuccess(data.user));
        }
      }
    } catch (error) {
      dispatch(userLoginFail())
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (supabase: SupabaseClient) => {
    return supabase.auth.signOut();
  }
);

export const {
  getAuthUserStart,
  getAuthUserSuccess,
  getAuthUserFail,
  userLoginStart,
  userLoginFail,
  userLoginSuccess,
} = userSlice.actions;

export default userSlice.reducer;
