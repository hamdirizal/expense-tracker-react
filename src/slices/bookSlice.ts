import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../types";
import { AppDispatch } from "../store";
import { SupabaseClient } from "@supabase/supabase-js";

export interface BookState {
  owned_books: Book[];
  get_owned_books_loading: boolean;
  get_owned_books_error: string;
  create_book_loading: boolean;
  create_book_success: boolean;
  create_book_error: string;
}

const initialState: BookState = {
  owned_books: [],
  get_owned_books_loading: false,
  get_owned_books_error: "",
  create_book_loading: false,
  create_book_success: false,
  create_book_error: "",
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
    // getOwnedBooks
    builder.addCase(getOwnedBooks.pending, (state) => {
      state.get_owned_books_loading = true;
      state.get_owned_books_error = "";
    });
    builder.addCase(getOwnedBooks.fulfilled, (state, action) => {
      state.get_owned_books_loading = false;
      state.owned_books = action.payload;
    });
    builder.addCase(getOwnedBooks.rejected, (state, action) => {
      state.get_owned_books_loading = false;
      state.get_owned_books_error = action.payload as string;
    });
    // createBook
    builder.addCase(createBook.pending, (state) => {
      state.create_book_loading = true;
      state.create_book_error = "";
    });
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.create_book_loading = false;
      state.create_book_success = true;
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.create_book_loading = false;
      state.create_book_success = false;
      state.create_book_error = action.payload as string;
    });
  },
});

export const getOwnedBooks = createAsyncThunk(
  "book/getOwnedBooks",
  async (supabase: SupabaseClient, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("books").select("*");
      if (error) {
        return rejectWithValue("Error when retrieving books");
      } else {
        return data;
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);

export const createBook = createAsyncThunk(
  "book/createBook",
  async (
    payload: { supabase: SupabaseClient; title: string; owner: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await payload.supabase
        .from("books")
        .insert([{ title: payload.title, owner: payload.owner }])
        .select();
      if (error) {
        return rejectWithValue("Error when creating book");
      } else {
        return data;
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);

export const { getOwnedBooksReset } = bookSlice.actions;

export default bookSlice.reducer;
