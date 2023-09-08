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
import TransactionList from "../components/TransactionList";
import PlusMinusSign from "../components/PlusMinusSign";

const BookSinglePage = () => {
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
              <Link to={""}>{Texts.SEARCH}</Link>
            </li>

            <li className="RegularList__li">
              <Link to={""}>{Texts.MANAGE}</Link>
            </li>
          </ul>
        </div>
        <div className="HSpace2"></div>
        <div className="Heading3">📋 {Texts.SUMMARY}</div>
        <TransactionSummary summary={getTransactionSummaryQuery.data || null} />

        <div className="HSpace2"></div>
        <div className="Heading3">🕐 {Texts.RECENTLY_ADDED}</div>

        {getRecentTransactionsQuery.data?.length ? (
          <TransactionList
            isLoading={getRecentTransactionsQuery.isLoading}
            transactions={getRecentTransactionsQuery.data}
          />
        ) : <div>{Texts.NO_TRANSACTIONS}</div>}
      </>
    );
  };

  return (
    <div data-testid="BookSinglePage">
      {getSingleBookQuery.data ? renderFinalMarkup() : null}
      {getSingleBookQuery.isError && (
        <ErrorDiv error={getSingleBookQuery.error.message} />
      )}      
    </div>
  );
};

export default BookSinglePage;
