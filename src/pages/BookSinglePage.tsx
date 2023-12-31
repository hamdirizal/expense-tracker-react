import { Link, useParams } from "react-router-dom";

import JustError from "../components/JustError";
import TransactionList from "../components/TransactionList";
import TransactionSummary from "../components/TransactionSummary";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";
import useGetTransactionSummaryQuery from "../services/useGetTransactionSummaryQuery";

const BookSinglePage = () => {
  const { book_id } = useParams();

  const getAuthUserQuery = useGetAuthUserQuery();

  const getSingleBookQuery = useGetSingleBookQuery(book_id || "");

  const getRecentTransactionsQuery = useGetRecentTransactionsQuery(
    book_id || ""
  );

  const getTransactionSummaryQuery = useGetTransactionSummaryQuery(
    book_id || ""
  );

  const renderFinalMarkup = () => {
    return (
      <>
        <ul className="Breadcrumbs">
          <li>
            <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
          </li>
          <li>
            <span>{getSingleBookQuery.data?.title || ""}</span>
          </li>
        </ul>

        <div className="Heading3">💡 {Texts.ACTIONS}</div>
        <div className="RegularList">
          {book_id ? (
            <ul className="RegularList__ul">
              <li className="RegularList__li">
                <Link
                  to={AppPaths.ADD_TRANSACTION.replace(/:book_id/g, book_id)}
                >
                  {Texts.ADD_TRANSACTION}
                </Link>
              </li>
              <li className="RegularList__li">
                <Link to={""}>{Texts.LISTING}</Link>
              </li>

              <li className="RegularList__li">
                <Link to={""}>{Texts.MANAGE}</Link>
              </li>

              <li className="RegularList__li">
                <Link to={AppPaths.COLLABORATORS.replace(/:book_id/g, book_id)}>
                  {Texts.COLLABORATORS}
                </Link>
              </li>

              <li className="RegularList__li">
                <Link
                  to={AppPaths.SEARCH_TRANSACTIONS.replace(
                    /:book_id/g,
                    book_id
                  )}
                >
                  {Texts.SEARCH_TRANSACTIONS}
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="HSpace2"></div>
        <div className="Heading3">📋 {Texts.SUMMARY}</div>
        <TransactionSummary summary={getTransactionSummaryQuery.data || null} />

        <div className="HSpace2"></div>
        <div className="Heading3">🕐 {Texts.RECENTLY_ADDED}</div>

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
    <div data-testid="BookSinglePage">
      {getSingleBookQuery.data ? renderFinalMarkup() : null}
      {getSingleBookQuery.isError && <JustError />}
    </div>
  );
};

export default BookSinglePage;
