import { Helmet } from "react-helmet";
import { AppPaths, AppTitle, Texts } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";
import TransactionList from "../components/TransactionList";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import SectionTitle from "../components/SectionTitle";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import Heading1 from "../components/Heading1";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";
import ErrorDiv from "../components/ErrorDiv";
import ModalSelectBook from "../components/ModalSelectBook";
import AddTransactionForm from "../components/AddTransactionForm";
import CurrentBookLine from "../components/CurrentBookLine";
import { Transaction } from "../types";
import TransactionCard from "../components/TransactionCard";
import LinkWithEmoji from "../components/LinkWithEmoji";
import { getBookEmoji } from "../helpers/globalHelper";

const AddTransactionPage = () => {
  const navigate = useNavigate();

  const { book_id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Link
              to={AppPaths.BOOK_SINGLE.replace(/:book_id/, book_id || "")}
            >
              {getSingleBookQuery.data?.title || ""}
            </Link>
          </li>
          <li>
            <span>{Texts.ADD_TRANSACTION}</span>
          </li>
        </ul>
        <AddTransactionForm
          cancelFn={() =>
            navigate(AppPaths.BOOK_SINGLE.replace(/:book_id/, book_id || ""))
          }
          bookId={parseInt(book_id || "0")}
        />
        <div className="HSpace2"></div>

        {getRecentTransactionsQuery.data ? (
          <>
            <h3 className="Heading3">{Texts.RECENTLY_ADDED}</h3>

            <TransactionList
              isLoading={getRecentTransactionsQuery.isLoading}
              transactions={getRecentTransactionsQuery.data}
            />
          </>
        ) : null}
      </>
    );
  };

  return (
    <div data-testid="BookDashboardpage">
      {getSingleBookQuery.data ? renderPageContent() : null}
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

export default AddTransactionPage;
