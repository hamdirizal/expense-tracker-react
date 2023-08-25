import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../types";
import { AppDispatch } from "../store";
import { SupabaseClient } from "@supabase/supabase-js";

export interface BookState {
  owned_books: Book[];
  owned_books_loading: boolean;
  owned_books_loading_error: string;
}

const initialState: BookState = {
  owned_books: [],
  owned_books_loading: false,
  owned_books_loading_error: "",
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // Get bank accounts
    getOwnedBooksStart: (state: BookState) => {
      state.owned_books_loading = true;
      state.owned_books_loading_error = "";
      state.owned_books = [];
    },
    getOwnedBooksSuccess: (state: BookState, action: PayloadAction<Book[]>) => {
      state.owned_books_loading = false;
      state.owned_books = action.payload;
    },
    getOwnedBooksFail: (state: BookState, actions: PayloadAction<any>) => {
      state.owned_books_loading = false;
      state.owned_books_loading_error = actions.payload.data.message;
    },
    getOwnedBooksReset: (state: BookState) => {
      state.owned_books_loading = false;
      state.owned_books_loading_error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.owned_books_loading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.owned_books_loading = false;
      // state.contents = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.owned_books_loading = false;
      state.owned_books_loading_error = 'error happened';
    });
  },
});

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    return res.json();
  }
);

export const getOwnedxBooks =
  (supabase: SupabaseClient) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getOwnedBooksStart());
      const { data, error } = await supabase.from("books").select("*");
      if (error) {
        dispatch(getOwnedBooksFail(error.message));
      } else {
        dispatch(getOwnedBooksSuccess(data));
      }
    } catch (e) {
      console.log("[ERROR e]", e);
      dispatch(getOwnedBooksFail(e));
    }
  };

export const {
  getOwnedBooksStart,
  getOwnedBooksSuccess,
  getOwnedBooksFail,
  getOwnedBooksReset,
} = bookSlice.actions;

export default bookSlice.reducer;
