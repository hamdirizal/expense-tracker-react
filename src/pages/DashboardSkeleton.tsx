import { Outlet } from "react-router-dom";

const DashboardSkeleton = () => {
  return (
    <div data-testid="DashboardSkeleton" className="border-2 border-blue-500">
      <div>This is DashboardSkeleton</div>
      <Outlet />
    </div>
  );
};

export default DashboardSkeleton;
