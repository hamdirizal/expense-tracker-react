import { Menu } from "@headlessui/react";
import SvgUserIcon from "../svg-components/SvgUserIcon";
import { User } from "../types";
import { Link } from "react-router-dom";
import { logout } from "../helpers/storageHelper";

interface UserButtonProps {
  user: User | null;
}

const UserButton = ({ user }: UserButtonProps) => {
  return (
    <Menu>
      <div className="UserButton">
        <Menu.Button className="UserButton__button">
          Hi,
          <span className="UserButton__name">
            {user?.nickname || "No name"}
          </span>
          <div className="UserButton__icon">
            <SvgUserIcon color="#097cc3" />
          </div>
        </Menu.Button>
        <Menu.Items className="UserButton__dropdown">
          <Menu.Item>
            <Link className="UserButton__dropdownItem" to="/account-settings">
              My Profile
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button
              className="UserButton__dropdownItem"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </Menu.Item>
        </Menu.Items>
      </div>
    </Menu>
  );
};

export default UserButton;
