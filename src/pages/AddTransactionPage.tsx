import { Helmet } from "react-helmet";
import { AppPaths, AppTitle } from "../constants";
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
        <CurrentBookLine
          title={getSingleBookQuery.data?.title || ""}
          onSwitch={() => setIsModalOpen(true)}
        />

        <h1 className="PageTitle">Add transaction</h1>

        <AddTransactionForm
          cancelFn={() =>
            navigate(AppPaths.BOOK_DASHBOARD.replace(/:book_id/, book_id || ""))
          }
          bookId={parseInt(book_id || "0")}
        />

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
