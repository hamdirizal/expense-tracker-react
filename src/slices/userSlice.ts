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
}

const initialState: UserState = {
  auth_user: null,
  get_auth_user_loading: false,
  get_auth_user_error: "",
  user_logout_loading: false,
  user_logout_success: false,
  user_logout_error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthUser.pending, (state) => {
      state.get_auth_user_loading = true;
      state.get_auth_user_error = "";
    });
    builder.addCase(getAuthUser.fulfilled, (state, action) => {
      state.get_auth_user_loading = false;
      if (action.payload.error) {
        state.get_auth_user_error = action.payload.error.message;
      } else {
        state.auth_user = action.payload.data.user || null;
      }
    });
    builder.addCase(getAuthUser.rejected, (state, action) => {
      state.get_auth_user_loading = false;
      state.get_auth_user_error = "error happened";
    });
    builder.addCase(userLogout.pending, (state) => {
      state.user_logout_loading = true;
      state.user_logout_error = "";
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.user_logout_loading = false;
      if (action.payload.error) {
        state.user_logout_error = action.payload.error.message;
      } else {
        state.auth_user = null;
      }
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.user_logout_loading = false;
      state.user_logout_error = "error happened";
    });
  },
});

export const getAuthUser = createAsyncThunk(
  "user/getAuthUser",
  async (supabase: SupabaseClient) => {
    return supabase.auth.getUser();
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
