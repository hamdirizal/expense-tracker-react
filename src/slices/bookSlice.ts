import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../types";
import { AppDispatch } from "../store";
import { SupabaseClient } from "@supabase/supabase-js";

export interface BookState {
  owned_books: Book[];
  owned_books_loading: boolean;
  owned_books_error: string;
}

const initialState: BookState = {
  owned_books: [],
  owned_books_loading: false,
  owned_books_error: "",
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getOwnedBooksReset: (state: BookState) => {
      state.owned_books_loading = false;
      state.owned_books_error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOwnedBooks.pending, (state) => {
      state.owned_books_loading = true;
      state.owned_books_error = "";
    });
    builder.addCase(getOwnedBooks.fulfilled, (state, action) => {
      state.owned_books_loading = false;
      if (action.payload.error) {
        state.owned_books_error = action.payload.error.message;
      } else {
        state.owned_books = action.payload.data || [];
      }
    });
    builder.addCase(getOwnedBooks.rejected, (state, action) => {
      state.owned_books_loading = false;
      state.owned_books_error = "error happened";
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
