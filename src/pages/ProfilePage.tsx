import { Link } from "react-router-dom";

import { AppPaths, Texts } from "../constants";
import { logout } from "../helpers/storageHelper";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";

const ProfilePage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const renderIfLoggedIn = () => {
    return (
      <div>
        <ul className="Breadcrumbs">
          <li>
            <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
          </li>
          <li>
            <span>{Texts.MY_ACCOUNT}</span>
          </li>
        </ul>

        <div>
          <p>
            {Texts.LOGGED_IN_AS} <br />
            {getAuthUserQuery?.data?.email || ""} <br />
            <button
              onClick={() => {
                logout();
              }}
              className="ButtonLink"
            >
              Logout
            </button>
          </p>
        </div>

        <div className="HSpace2"></div>
        <div className="Heading3">✏️ Edit Basic Info</div>
        <div>Edit profile form</div>
        <div className="HSpace2"></div>
        <div className="Heading3">🔐 Change Password</div>
        <div>Change password form</div>
        <div className="HSpace2"></div>
        <div className="Heading3">⛔ Delete Account</div>
        <div>Delete profile form</div>
      </div>
    );
  };

  return getAuthUserQuery?.data ? renderIfLoggedIn() : null;
};

export default ProfilePage;
