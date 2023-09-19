import { Link, useNavigate, useParams } from "react-router-dom";

import AddTransactionForm from "../components/AddTransactionForm";
import ErrorDiv from "../components/ErrorDiv";
import TransactionList from "../components/TransactionList";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";

const AddTransactionPage = () => {
  const navigate = useNavigate();

  const { book_id } = useParams();

  const getSingleBookQuery = useGetSingleBookQuery(book_id || "");

  const getRecentTransactionsQuery = useGetRecentTransactionsQuery(
    book_id || ""
  );

  const renderPageContent = () => {
    return (
      <>
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
            <span>{Texts.ADD_TRANSACTION}</span>
          </li>
        </ul>
        <div className="WhitePanel">
          <AddTransactionForm
            cancelFn={() =>
              navigate(AppPaths.BOOK_SINGLE.replace(/:book_id/, book_id || ""))
            }
            bookId={parseInt(book_id || "0")}
          />
        </div>
        <div className="HSpace3"></div>
        <h3 className="Heading3">{Texts.RECENTLY_ADDED}</h3>
        {getRecentTransactionsQuery.data?.results?.length ? (
          <TransactionList
            transactions={getRecentTransactionsQuery.data.results}
          />
        ) : (
          <div>{Texts.NO_TRANSACTIONS}</div>
        )}
      </>
    );
  };

  return (
    <div>
      {getSingleBookQuery.data ? renderPageContent() : null}
      {getSingleBookQuery.isError && (
        <ErrorDiv error={getSingleBookQuery.error.message} />
      )}
    </div>
  );
};

export default AddTransactionPage;
