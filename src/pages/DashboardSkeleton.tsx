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
        className="min-h-screen px-6"
      >
        <div className="max-w-[720px] mx-auto">
          <Helmet>
            <title>Dashboard | {AppTitle}</title>
          </Helmet>
          <AppHeader />
          <Outlet />
        </div>
      </div>
    );
  };

  if (getAuthUserQuery.isLoading) {
    return null;
  } else if (!getAuthUserQuery?.data?.id) {
    return <Navigate to={AppPaths.LOGIN} />;
  } else {
    return renderPageMarkup();
  }
};

export default DashboardSkeleton;
