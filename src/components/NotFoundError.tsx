import { Link } from "react-router-dom";

import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";

const NotFoundError = () => {
  return (
    <div className="NotFoundError">
      <ul className="Breadcrumbs">
        <li>
          <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
        </li>
      </ul>
      <div className="NotFoundError__emoji">😐</div>
      <div className="NotFoundError__title">{Texts.OOPS}</div>
      <div className="NotFoundError__desc">{Texts.PAGE_NOT_FOUND_MESSAGE}</div>
    </div>
  );
};

export default NotFoundError;
