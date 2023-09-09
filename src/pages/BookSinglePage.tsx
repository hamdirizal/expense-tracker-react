import { Link, useParams } from "react-router-dom";

import ErrorDiv from "../components/ErrorDiv";
import NotFoundError from "../components/NotFoundError";
import TransactionList from "../components/TransactionList";
import TransactionSummary from "../components/TransactionSummary";
import { AppPaths, Texts } from "../constants";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";
import useGetTransactionSummaryQuery from "../services/useGetTransactionSummaryQuery";
import ErrorPage from "./ErrorPage";

const BookSinglePage = () => {
  const { book_id } = useParams();

  const getSingleBookQuery = useGetSingleBookQuery(parseInt(book_id || "0"));

  const getRecentTransactionsQuery = useGetRecentTransactionsQuery(
    parseInt(book_id || "0")
  );

  const getTransactionSummaryQuery = useGetTransactionSummaryQuery(
    parseInt(book_id || "0")
  );

  const renderFinalMarkup = () => {
    return (
      <>
        <ul className="Breadcrumbs">
          <li>
            ⚓ <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
          </li>
          <li>
            <span>{getSingleBookQuery.data?.title || ""}</span>
          </li>
        </ul>

        <div className="Heading3">💡 {Texts.ACTIONS}</div>
        <div className="RegularList">
          <ul className="RegularList__ul">
            {book_id ? (
              <li className="RegularList__li">
                <Link
                  to={AppPaths.ADD_TRANSACTION.replace(/:book_id/g, book_id)}
                >
                  {Texts.ADD_TRANSACTION}
                </Link>
              </li>
            ) : null}
            <li className="RegularList__li">
              <Link to={""}>{Texts.LISTING}</Link>
            </li>

            <li className="RegularList__li">
              <Link to={""}>{Texts.MANAGE}</Link>
            </li>

            {book_id ? (
              <li className="RegularList__li">
                <Link
                  to={AppPaths.SEARCH_TRANSACTIONS.replace(
                    /:book_id/g,
                    book_id
                  )}
                >
                  {Texts.SEARCH}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="HSpace2"></div>
        <div className="Heading3">📋 {Texts.SUMMARY}</div>
        <TransactionSummary summary={getTransactionSummaryQuery.data || null} />

        <div className="HSpace2"></div>
        <div className="Heading3">🕐 {Texts.RECENTLY_ADDED}</div>

        {getRecentTransactionsQuery.data?.length ? (
          <TransactionList transactions={getRecentTransactionsQuery.data} />
        ) : (
          <div>{Texts.NO_TRANSACTIONS}</div>
        )}
      </>
    );
  };

  return (
    <div data-testid="BookSinglePage">
      {getSingleBookQuery.data ? renderFinalMarkup() : null}
      {getSingleBookQuery.isError && <NotFoundError />}
    </div>
  );
};

export default BookSinglePage;
