import { Navigate, Outlet } from "react-router-dom";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";

const DashboardSkeleton = () => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const renderPageMarkup = () => {
    return (
      <div
        data-testid="DashboardSkeleton"
        className="border-2 border-blue-500 bg-white p-2"
      >
        <Outlet />
      </div>
    );
  };

  if (getAuthUserQuery.isLoading) {
    return null;
  } else if (getAuthUserQuery.isError) {
    return <Navigate to="/login" />;
  } else {
    return renderPageMarkup();
  }
};

export default DashboardSkeleton;
