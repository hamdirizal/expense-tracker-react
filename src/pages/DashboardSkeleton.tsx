import { Navigate, Outlet } from "react-router-dom";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";

const DashboardSkeleton = () => {
  const getAuthUserQuery = useGetAuthUserQuery();

  if (getAuthUserQuery.isLoading) {
    return null;
  } else {
    return (
      <div
        data-testid="DashboardSkeleton"
        className="border-2 border-blue-500 bg-white p-2"
      >
        {getAuthUserQuery.isError ? <Navigate to="/login" /> : <Outlet />}
      </div>
    );
  }
};

export default DashboardSkeleton;
