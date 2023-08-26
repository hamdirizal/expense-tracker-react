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
import CreateBookPage from "./pages/ManageBooksPage";
import usePage from "./hooks/usePage";
import VarDump from "./components/VarDump";
import useGetAuthUserQuery from "./services/useGetAuthUserQuery";

interface AppProps {
  supabase: SupabaseClient;
}

function App({ supabase }: AppProps) {
  const { renderPage, switchPage } = usePage();

  // useEffect(() => {
  //   if (authUserTan.isSuccess) {
  //     switchPage(Page.DASHBOARD);
  //   } else {
  //     switchPage(Page.LOGIN);
  //   }
  // }, [authUserTan]);

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
