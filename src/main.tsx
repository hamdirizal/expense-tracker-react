import ReactDOM from "react-dom/client";
import "./index.css";
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
import ManageBooksPage from "./pages/ManageBooksPage.tsx";
import AddTransactionPage from "./pages/AddTransactionPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: AppPaths.DASHBOARD,
    element: <DashboardSkeleton />,
    children: [
      {
        path: AppPaths.DASHBOARD,
        element: <DashboardHomePage />,
      },
      {
        path: AppPaths.ADD_TRANSACTION,
        element: <AddTransactionPage />,
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
