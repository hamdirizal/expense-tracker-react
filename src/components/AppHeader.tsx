import { Link } from "react-router-dom";
import { AppPaths } from "../constants";
import useLogoutUserMutation from "../services/useLogoutUserMutation";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";

const AppHeader = () => {
  const logoutUserMutation = useLogoutUserMutation();
  const getUserConfigQuery = useGetUserConfigQuery();
  return (
    <header
      data-testid="AppHeader"
      className="flex justify-between mb-2 border-b-2"
    >
      <span className="font-bold">Daily Expense</span>

      <Link to={AppPaths.DASHBOARD}>Dashboard</Link>
      <span>Listing</span>
      <Link to={AppPaths.ADD_TRANSACTION}>Add Transaction</Link>

      <span>Search</span>
      <span>
        Welcome, {getUserConfigQuery.data?.nickname || "No name"}
        <button onClick={() => logoutUserMutation.mutate()}>(logout)</button>
      </span>
    </header>
  );
};

export default AppHeader;
