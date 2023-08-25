import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../types";
import { AppDispatch } from "../store";
import { SupabaseClient } from "@supabase/supabase-js";

export interface BookState {
  owned_books: Book[];
  get_owned_books_loading: boolean;
  get_owned_books_error: string;
}

const initialState: BookState = {
  owned_books: [],
  get_owned_books_loading: false,
  get_owned_books_error: "",
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getOwnedBooksReset: (state: BookState) => {
      state.get_owned_books_loading = false;
      state.get_owned_books_error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOwnedBooks.pending, (state) => {
      state.get_owned_books_loading = true;
      state.get_owned_books_error = "";
    });
    builder.addCase(getOwnedBooks.fulfilled, (state, action) => {
      state.get_owned_books_loading = false;
      if (action.payload.error) {
        state.get_owned_books_error = action.payload.error.message;
      } else {
        state.owned_books = action.payload.data || [];
      }
    });
    builder.addCase(getOwnedBooks.rejected, (state, action) => {
      state.get_owned_books_loading = false;
      state.get_owned_books_error = "error happened";
    });
  },
});

export const getOwnedBooks = createAsyncThunk(
  "book/getOwnedBooks",
  async (supabase: SupabaseClient) => {
    return await supabase.from("books").select("*");
  }
);

export const { getOwnedBooksReset } = bookSlice.actions;

export default bookSlice.reducer;
