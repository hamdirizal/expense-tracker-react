import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";
import ErrorDiv from "../components/ErrorDiv";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import ModalSelectBook from "../components/ModalSelectBook";
import { AppPaths, Texts } from "../constants";
import Heading3 from "../components/Heading3";
import CurrentBookLine from "../components/CurrentBookLine";
import useGetTransactionSummaryQuery from "../services/useGetTransactionSummaryQuery";
import TransactionSummary from "../components/TransactionSummary";
import { Transaction } from "../types";
import TransactionCard from "../components/TransactionCard";
import SgvArrowLeftIcon from "../svg-components/SgvArrowLeftIcon";
import SvgAddIcon from "../svg-components/SvgAddIcon";
import LinkWithEmoji from "../components/LinkWithEmoji";
import { getBookEmoji } from "../helpers/globalHelper";

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
        <LinkWithEmoji
          to={AppPaths.BOOK_WELCOME}
          label={Texts.BACK_TO_BOOK_SELECTION}
          emoji="◀️"
        />
        <div className="HSpace2"></div>
        <h2 className="Heading2">
          {getBookEmoji(getSingleBookQuery.data?.title || "")}{" "}
          {getSingleBookQuery.data?.title || ""}
        </h2>
        <ul className="BookActions">
          {book_id ? (
            <li>
              <LinkWithEmoji
                to={AppPaths.ADD_TRANSACTION.replace(/:book_id/g, book_id)}
                label={Texts.ADD_TRANSACTION}
                emoji="➕"
              />
            </li>
          ) : null}
          <li>
            <LinkWithEmoji to={""} label={Texts.LISTING} emoji="📝" />
          </li>
          <li>
            <LinkWithEmoji to={""} label={Texts.SEARCH} emoji="🔍" />
          </li>
          <li>
            <LinkWithEmoji to={""} label={Texts.MANAGE} emoji="⚙️" />
          </li>
        </ul>

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
