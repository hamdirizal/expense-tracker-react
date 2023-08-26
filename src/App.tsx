import { useState, useEffect, createContext, useMemo } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Page } from "./types";
import LoginPage from "./pages/LoginPage";
import SkeletonWithHeader from "./components/SkeletonWithHeader";
import ManageBooksPage from "./pages/ManageBooksPage";
import DashboardPage from "./pages/DashboardPage";

interface AppProps {
  supabase: SupabaseClient;
}

export const PageContext = createContext({
  currentPage: Page.LOGIN,
  setCurrentPage: (page: Page) => {},
});

function App({ supabase }: AppProps) {
  const [currentPage, setCurrentPage] = useState(Page.LOGIN);

  const renderPage = (currentPage: Page) => {
    if (currentPage === Page.CREATE_BOOK) {
      return <SkeletonWithHeader content={<ManageBooksPage />} />;
    } else if (currentPage === Page.DASHBOARD) {
      return <SkeletonWithHeader content={<DashboardPage />} />;
    } else if (currentPage === Page.LOGIN) {
      return <LoginPage />;
    } else {
      return <LoginPage />;
    }
  };

  const value = useMemo(() => ({ currentPage, setCurrentPage }), [currentPage]);

  return (
    <PageContext.Provider value={value}>
      <div
        className="max-w-2xl mx-auto bg-white px-4 min-h-screen"
        data-testid="App"
      >
        {renderPage(currentPage)}
      </div>
    </PageContext.Provider>
  );
}

export default App;
