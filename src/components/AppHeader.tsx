import { Link, useNavigate } from "react-router-dom";
import { AppPaths } from "../constants";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { logout } from "../helpers/storageHelper";

const AppHeader = () => {
  const navigate = useNavigate();
  const getAuthUserQuery = useGetAuthUserQuery();
  return (
    <header className="AppHeader" data-testid="AppHeader">
      <div className="AppHeader__centering">
        <span className="AppHeader__logo">Daily Expense</span>

        <span>
          Welcome, {getAuthUserQuery.data?.nickname || "No name"}{" "}
          <button
            className="ButtonLink"
            onClick={() => {
              logout();
            }}
          >
            (logout)
          </button>
        </span>
      </div>
    </header>
  );
};

export default AppHeader;
