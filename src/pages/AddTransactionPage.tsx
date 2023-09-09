import { Link, useNavigate, useParams } from "react-router-dom";

import AddTransactionForm from "../components/AddTransactionForm";
import ErrorDiv from "../components/ErrorDiv";
import TransactionList from "../components/TransactionList";
import { AppPaths, Texts } from "../constants";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";

const AddTransactionPage = () => {
  const navigate = useNavigate();

  const { book_id } = useParams();

  const getSingleBookQuery = useGetSingleBookQuery(parseInt(book_id || "0"));

  const getRecentTransactionsQuery = useGetRecentTransactionsQuery(
    parseInt(book_id || "0")
  );

  const renderPageContent = () => {
    return (
      <>
        <ul className="Breadcrumbs">
          <li>
            ⚓ <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
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
          <div>{Texts.NOT_ALLOWED_TO_EDIT_TRANSACTION}</div>
          <div className="HSpace1"></div>
          <AddTransactionForm
            cancelFn={() =>
              navigate(AppPaths.BOOK_SINGLE.replace(/:book_id/, book_id || ""))
            }
            bookId={parseInt(book_id || "0")}
          />
        </div>
        <div className="HSpace3"></div>
        <h3 className="Heading3">{Texts.RECENTLY_ADDED}</h3>
        {getRecentTransactionsQuery.data?.length ? (
          <TransactionList
            isLoading={getRecentTransactionsQuery.isLoading}
            transactions={getRecentTransactionsQuery.data}
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
