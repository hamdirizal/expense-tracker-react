import SvgUserIcon from "../svg-components/SvgUserIcon";
import { User } from "../types";
import { Link } from "react-router-dom";
import { AppPaths } from "../constants";

interface UserButtonProps {
  user: User | null;
}

const UserButton = ({ user }: UserButtonProps) => {
  return (
    <Link to={AppPaths.PROFILE} className="UserBtn">
      <div className="UserBtn__hi">Hi,</div>
      <div className="UserBtn__name">{user?.nickname || "User"}</div>
      <div className="UserBtn__icon">
        <SvgUserIcon color="white" />
      </div>
    </Link>
  );
};

export default UserButton;
