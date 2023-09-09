import { Link, useParams } from "react-router-dom";

import { AppPaths, Texts } from "../constants";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";

const SingleTransactionPage = () => {
  const { book_id } = useParams();

  const getSingleBookQuery = useGetSingleBookQuery(parseInt(book_id || "0"));

  return (
    <div>
      <ul className="Breadcrumbs">
        <li>
          <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
        </li>
        <li>
          <Link to={AppPaths.BOOK_SINGLE.replace(/:book_id/, book_id || "")}>
            {getSingleBookQuery.data?.title || ""}
          </Link>
        </li>
        <li>
          <span>{Texts.VIEW_TRANSACTION}</span>
        </li>
      </ul>
    </div>
  );
};

export default SingleTransactionPage;
