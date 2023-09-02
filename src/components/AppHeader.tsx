import { Link, useNavigate } from "react-router-dom";
import { AppPaths } from "../constants";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { logout } from "../helpers/storageHelper";

const AppHeader = () => {
  const navigate = useNavigate();
  const getAuthUserQuery = useGetAuthUserQuery();
  return (
    <header
      data-testid="AppHeader"
      className="flex justify-between mb-2 border-b-2"
    >
      <span className="font-bold">Daily Expense</span>

      <Link to={AppPaths.DASHBOARD}>Dashboard</Link>
      <Link to={AppPaths.ADD_TRANSACTION}>Add Transaction</Link>
      <span>Listing</span>

      <span>Search</span>
      <span>
        Welcome, {getAuthUserQuery.data?.nickname || "No name"}
        <button onClick={() => {
          logout();
        }}>(logout)</button>
      </span>
    </header>
  );
};

export default AppHeader;
