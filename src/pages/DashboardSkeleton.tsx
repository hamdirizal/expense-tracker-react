import { Helmet } from "react-helmet";
import { Navigate, Outlet } from "react-router-dom";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import AppHeader from "../components/AppHeader";
import { AppPaths, AppTitle } from "../constants";

const DashboardSkeleton = () => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const renderPageMarkup = () => {
    return (
      <div
        data-testid="DashboardSkeleton"
        className="border-2 border-blue-500 bg-white p-2"
      >
        <Helmet>
          <title>Dashboard | {AppTitle}</title>
        </Helmet>
        <AppHeader />
        <Outlet />
      </div>
    );
  };

  if (getAuthUserQuery.isLoading) {
    return null;
  } else if (getAuthUserQuery.isSuccess && !getAuthUserQuery?.data?.id) {
    return <Navigate to={AppPaths.LOGIN} />;
  } else {
    return renderPageMarkup();
  }
};

export default DashboardSkeleton;
