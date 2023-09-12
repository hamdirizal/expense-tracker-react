import { Link } from "react-router-dom";

import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";

const JustError = () => {
  return (
    <div className="JustError">
      <ul className="Breadcrumbs">
        <li>
          <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
        </li>
      </ul>
      <div className="JustError__emoji">😐</div>
      <div className="JustError__title">{Texts.OOPS}</div>
      <div className="JustError__desc">Error happens.</div>
    </div>
  );
};

export default JustError;
