import ReactDOM from "react-dom/client";
import "./css/index.scss";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import { AppPaths } from "./constants.ts";
import AddTransactionPage from "./pages/AddTransactionPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import MemberAreaSkeleton from "./pages/MemberAreaSkeleton.tsx";
import BookSinglePage from "./pages/BookSinglePage.tsx";
import BookManagePage from "./pages/BookManagePage.tsx";
import ViewTransactionPage from "./pages/ViewTransactionPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const router = createBrowserRouter([
  {
    path: AppPaths.LOGIN,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MemberAreaSkeleton />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: AppPaths.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: AppPaths.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: AppPaths.BOOK_SINGLE,
        element: <BookSinglePage />,
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
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
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
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  </SupabaseContext.Provider>
);
