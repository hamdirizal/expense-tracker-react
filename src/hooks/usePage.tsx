import { useDispatch, useSelector } from "react-redux";
import ManageBooksPage from "../pages/ManageBooksPage";
import LoginPage from "../pages/LoginPage";
import { AppDispatch, RootState } from "../store";
import { Page } from "../types";
import { setCurrentPage } from "../slices/pageSlice";
import DashboardPage from "../pages/DashboardPage";
import SkeletonWithHeader from "../components/SkeletonWithHeader";

const usePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { current_page } = useSelector((state: RootState) => state.page);
  const renderPage = () => {
    if (current_page === Page.LOGIN) {
      return <LoginPage />;
    } else if (current_page === Page.CREATE_BOOK) {
      return <SkeletonWithHeader content={<ManageBooksPage />} />;
    } else if (current_page === Page.DASHBOARD) {
      return <DashboardPage />;
    } else {
      return null;
    }
  };
  const switchPage = (page: Page) => {
    dispatch(setCurrentPage(page));
  };

  return { renderPage, switchPage };
};

export default usePage;
