import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";
import ErrorDiv from "../components/ErrorDiv";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import ModalSelectBook from "../components/ModalSelectBook";
import { AppPaths } from "../constants";
import Heading3 from "../components/Heading3";
import CurrentBookLine from "../components/CurrentBookLine";
import useGetTransactionSummaryQuery from "../services/useGetTransactionSummaryQuery";
import TransactionSummary from "../components/TransactionSummary";
import { Transaction } from "../types";
import TransactionCard from "../components/TransactionCard";

const BookDashboardPage = () => {
  const { book_id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div>
          <CurrentBookLine
            title={getSingleBookQuery.data?.title || ""}
            onSwitch={() => setIsModalOpen(true)}
          />
        </div>

        <div className="BookActions">
          <h3 className="BookActions__title">Actions: </h3>
          {book_id ? (
            <div className="BookActions__item">
              <Link to={AppPaths.ADD_TRANSACTION.replace(/:book_id/g, book_id)}>
                Add transaction
              </Link>
            </div>
          ) : null}
          <div className="BookActions__item">Listing</div>
          <div className="BookActions__item">Search</div>
          {book_id ? (
            <div className="BookActions__item">
              <Link
                to={AppPaths.BOOK_MANAGE.replace(
                  /:book_id/g,
                  book_id.toString()
                )}
              >
                Manage
              </Link>
            </div>
          ) : null}
        </div>

        <TransactionSummary summary={getTransactionSummaryQuery.data || null} />

        <div className="RecentTransactions">
          <h3 className="RecentTransactions__title">Recently added</h3>
          <div>
            {getRecentTransactionsQuery.data?.map((tx: Transaction) => {
              return <TransactionCard transaction={tx} key={tx.id} />;
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div data-testid="BookDashboardpage">
      {getSingleBookQuery.data ? renderFinalMarkup() : null}
      {getSingleBookQuery.isError && (
        <ErrorDiv error={getSingleBookQuery.error.message} />
      )}
      <ModalSelectBook
        isOpen={isModalOpen}
        closeFn={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BookDashboardPage;
