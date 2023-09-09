import "./css/index.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppPaths } from "./constants.ts";
import AddTransactionPage from "./pages/AddTransactionPage.tsx";
import BookManagePage from "./pages/BookManagePage.tsx";
import BookSinglePage from "./pages/BookSinglePage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MemberAreaSkeleton from "./pages/MemberAreaSkeleton.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SearchTransactionsPage from "./pages/SearchTransactionsPage.tsx";
import ViewTransactionPage from "./pages/ViewTransactionPage.tsx";

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
      {
        path: AppPaths.SEARCH_TRANSACTIONS,
        element: <SearchTransactionsPage />,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    {/* <ReactQueryDevtools initialIsOpen={true} /> */}
  </QueryClientProvider>
);
