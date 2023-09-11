import { Link, useParams } from "react-router-dom";

import ViewTransactionForm from "../components/ViewTransactionForm";
import { Texts } from "../constants";
import { AppPaths } from "../constants/app-paths";
import useCanUserUpdateTransaction from "../services/useCanUserUpdateTransaction";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";
import useGetSingleTransactionQuery from "../services/useGetSingleTransactionQuery";

const SingleTransactionPage = () => {
  const { book_id, transaction_id } = useParams();

  const getSingleBookQuery = useGetSingleBookQuery(parseInt(book_id || "0"));

  const getSingleTransactionQuery = useGetSingleTransactionQuery(
    parseInt(transaction_id || "0")
  );

  const canUserUpdateTransaction = useCanUserUpdateTransaction(
    parseInt(transaction_id || "0")
  );

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

      <div className="WhitePanel">
        {getSingleTransactionQuery?.data ? (
          <ViewTransactionForm transaction={getSingleTransactionQuery.data} />
        ) : null}
      </div>
    </div>
  );
};

export default SingleTransactionPage;
