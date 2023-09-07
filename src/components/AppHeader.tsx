import { Link, useNavigate } from "react-router-dom";
import { AppPaths } from "../constants";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { logout } from "../helpers/storageHelper";
import SvgUserIcon from "../svg-components/SvgUserIcon";
import UserButton from "./UserButton";
import logo from "../assets/monee-logo.png";

const AppHeader = () => {
  const navigate = useNavigate();
  const getAuthUserQuery = useGetAuthUserQuery();
  return (
    <header className="AppHeader" data-testid="AppHeader">
      <div className="AppHeader__centering">
        <Link to={AppPaths.BOOK_WELCOME} className="AppHeader__logo"><img src={logo} alt="Monee" /></Link>
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
