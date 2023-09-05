import ReactDOM from "react-dom/client";
import "./index.scss";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DashboardSkeleton from "./pages/DashboardSkeleton.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import DashboardHomePage from "./pages/DashboardHomePage.tsx";
import { AppPaths } from "./constants.ts";
import AddTransactionPage from "./pages/AddTransactionPage.tsx";
import EditTransactionPage from "./pages/EditTransactionPage.tsx";
import BookWelcomPage from "./pages/BookWelcomePage.tsx";
import MemberAreaSkeleton from "./pages/MemberAreaSkeleton.tsx";
import BookDashboardPage from "./pages/BookDashboardPage.tsx";
import BookManagePage from "./pages/BookManagePage.tsx";
import ViewTransactionPage from "./pages/ViewTransactionPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={AppPaths.BOOK_WELCOME} />,
  },
  {
    path: AppPaths.BOOK_WELCOME,
    element: <MemberAreaSkeleton />,
    children: [
      {
        path: AppPaths.BOOK_WELCOME,
        element: <BookWelcomPage />,
      },
      {
        path: AppPaths.BOOK_DASHBOARD,
        element: <BookDashboardPage />,
      },
      {
        path: AppPaths.BOOK_MANAGE,
        element: <BookManagePage />,
      },
      {
        path: AppPaths.ADD_TRANSACTION,
        element: <AddTransactionPage />,
      },
      {
        path: AppPaths.VIEW_TRANSACTION,
        element: <ViewTransactionPage />,
      },
    ],
  },

  //
  {
    path: AppPaths.DASHBOARD,
    element: <DashboardSkeleton />,
    children: [
      {
        path: AppPaths.DASHBOARD,
        element: <DashboardHomePage />,
      },
      {
        path: AppPaths.EDIT_TRANSACTION,
        element: <EditTransactionPage />,
      },
    ],
  },
  {
    path: AppPaths.LOGIN,
    element: <LoginPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const supabaseClient: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const SupabaseContext = createContext(supabaseClient);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SupabaseContext.Provider value={supabaseClient}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </SupabaseContext.Provider>
);
