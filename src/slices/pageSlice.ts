import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Page } from "../types";

export interface PageState {
  current_page: Page;
}

const initialState: PageState = {
  current_page: Page.DASHBOARD,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    switchPage: (state, action: PayloadAction<Page>) => {
      state.current_page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchPage } = pageSlice.actions;

export default pageSlice.reducer;
