import { Link } from "react-router-dom";

import logo from "../assets/monee-logo.png";
import { AppPaths } from "../constants/app-paths";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import UserButton from "./UserButton";

const AppHeader = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  return (
    <header className="AppHeader" data-testid="AppHeader">
      <div className="AppHeader__centering">
        <Link to={AppPaths.DASHBOARD} className="AppHeader__logo">
          <img src={logo} alt="Monee" />
        </Link>
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
