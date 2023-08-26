import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import bookReducer from "./slices/bookSlice";
import pageReducer from "./slices/pageSlice";
import userReducer from "./slices/userSlice";
import { bookApi } from "./services/book";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    page: pageReducer,
    user: userReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
