import { useState, useEffect } from "react";
import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import AppAnon from "./AppAnon";
import AppAuthenticated from "./AppAuthenticated";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "./slices/userSlice";
import { AppDispatch, RootState } from "./store";
import { Page } from "./types";
import LoginPage from "./pages/LoginPage";
import { setCurrentPage } from "./slices/pageSlice";
import CreateBookPage from "./pages/CreateBookPage";
import usePage from "./hooks/usePage";

interface AppProps {
  supabase: SupabaseClient;
}

function App({ supabase }: AppProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { auth_user } = useSelector((state: RootState) => state.user);

  const { renderPage, switchPage } = usePage();
  useEffect(() => {
    dispatch(getAuthUser(supabase));
  }, []);

  useEffect(() => {
    if (auth_user === null) {
      switchPage(Page.LOGIN);
    } else {
      switchPage(Page.CREATE_BOOK);
    }
  }, [auth_user]);

  return (
    <div
      className="max-w-2xl mx-auto bg-white px-4 min-h-screen"
      data-testid="App"
    >
      {renderPage()}
    </div>
  );
}

export default App;
