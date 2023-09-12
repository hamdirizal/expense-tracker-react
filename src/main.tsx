import "./css/index.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFoundError from "./components/NotFoundError.tsx";
import { AppPaths } from "./constants/app-paths";
import AddTransactionPage from "./pages/AddTransactionPage.tsx";
import AuthFlowSkeleton from "./pages/AuthFlowSkeleton.tsx";
import BookManagePage from "./pages/BookManagePage.tsx";
import BookSinglePage from "./pages/BookSinglePage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MemberAreaSkeleton from "./pages/MemberAreaSkeleton.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SearchTransactionsPage from "./pages/SearchTransactionsPage.tsx";
import SingleTransactionPage from "./pages/SingleTransactionPage.tsx";
import VerifyAccountPage from "./pages/VerifyAccountPage.tsx";

const router = createBrowserRouter([
  {
    path: AppPaths.LOGIN,
    element: <AuthFlowSkeleton content={<LoginPage />} />,
  },
  {
    path: AppPaths.REGISTER,
    element: <AuthFlowSkeleton content={<RegisterPage />} />,
  },
  {
    path: AppPaths.VERIFY_ACCOUNT,
    element: <AuthFlowSkeleton content={<VerifyAccountPage />} />,
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
        path: AppPaths.SINGLE_TRANSACTION,
        element: <SingleTransactionPage />,
      },
      {
        path: AppPaths.SEARCH_TRANSACTIONS,
        element: <SearchTransactionsPage />,
      },
      {
        path: "*",
        element: <NotFoundError />,
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
