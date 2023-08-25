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
  extraReducers: (builder) => {
    // getAuthUser
    builder.addCase(getAuthUser.pending, (state, action) => {
      state.get_auth_user_loading = true;
      state.get_auth_user_error = "";
    });
    builder.addCase(getAuthUser.rejected, (state, action) => {
      state.get_auth_user_loading = false;
      state.get_auth_user_error = "action is rejected";
    });
    builder.addCase(getAuthUser.fulfilled, (state, action) => {
      state.get_auth_user_loading = false;
      state.get_auth_user_error = "";
      state.auth_user = action.payload;
    });
    // userLogin
    builder.addCase(userLogin.pending, (state, action) => {
      state.user_login_loading = true;
      state.user_login_error = "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.user_login_loading = false;
      state.user_login_error = action.payload as string;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user_login_loading = false;
      state.user_login_error = "";
      state.auth_user = action.payload.user;
    });
  },
});

export const getAuthUser = createAsyncThunk(
  "user/getAuthUser",
  async (supabase: SupabaseClient, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        return rejectWithValue("manually rejected");
      } else {
        return fulfillWithValue(data.user);
      }
    } catch (error) {
      return rejectWithValue("some error happening");
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
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data, error } = await payload.supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
      if (error) {
        return rejectWithValue("Login failed");
      } else {
        return data;
      }
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (supabase: SupabaseClient) => {
    return supabase.auth.signOut();
  }
);

// export const {} = userSlice.actions;

export default userSlice.reducer;
