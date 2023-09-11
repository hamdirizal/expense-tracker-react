import { Link } from "react-router-dom";

import { AppPaths } from "../constants/app-paths";
import SvgUserIcon from "../svg-components/SvgUserIcon";
import { User } from "../types";

interface UserButtonProps {
  user: User | null;
}

const UserButton = ({ user }: UserButtonProps) => {
  return (
    <Link to={AppPaths.PROFILE} className="UserBtn">
      <span className="UserBtn__hi">Hi,</span>
      <span className="UserBtn__name">{user?.nickname || "User"}</span>
      <span className="UserBtn__icon">
        <SvgUserIcon color="white" />
      </span>
    </Link>
  );
};

export default UserButton;
