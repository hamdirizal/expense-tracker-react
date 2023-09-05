import { Link, useNavigate } from "react-router-dom";
import { AppPaths } from "../constants";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { logout } from "../helpers/storageHelper";
import SvgUserIcon from "../svg-components/SvgUserIcon";
import UserButton from "./UserButton";

const AppHeader = () => {
  const navigate = useNavigate();
  const getAuthUserQuery = useGetAuthUserQuery();
  return (
    <header className="AppHeader" data-testid="AppHeader">
      <div className="AppHeader__centering">
        <span className="AppHeader__logo">Daily Expense</span>
        <div>
          <UserButton user={getAuthUserQuery?.data || null} />
        </div>

        {/* <div className="UserButton">
          <div className="UserButton__icon">
            <SvgUserIcon color="black" />
          </div>
          {getAuthUserQuery.data?.nickname || "No name"}{" "}
          <button
            className="ButtonLink"
            onClick={() => {
              logout();
            }}
          >
            (logout)
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default AppHeader;
