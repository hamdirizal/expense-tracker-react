import { Outlet } from "react-router-dom";

const AppSkeleton = () => {
  return (
    <div data-testid="AppSkeleton" className="border-2 border-red-500 bg-white p-2">
      <Outlet />
    </div>
  );
};

export default AppSkeleton;
