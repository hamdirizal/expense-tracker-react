import { Link } from "react-router-dom";

import { Texts } from "../constants/texts";

const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <div className="NotFoundPage__emoji">😐</div>
      <div className="NotFoundPage__title">{Texts.OOPS}</div>
      <div className="NotFoundPage__desc">{Texts.PAGE_NOT_FOUND_MESSAGE}</div>
      <p>
        Back to the <Link to="/">home page</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
