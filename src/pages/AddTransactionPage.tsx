import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PageTitle from "../components/PageTitle";
import { AppTitle } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";
import TransactionList from "../components/TransactionList";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import SectionTitle from "../components/SectionTitle";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import AddEditTransactionForm from "../components/AddEditTransactionForm";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";

const AddTransactionPage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const getCollaboratedBooksQuery = useGetOwnedBooksQuery();
  const activeBookId = getAuthUserQuery.data?.active_book_id || 0;
  const getRecentTransactionsQuery =
    useGetRecentTransactionsQuery(activeBookId);

  const renderContent = () => {
    return (
      <div>
        <AddEditTransactionForm />
        <hr />
        <SectionTitle title="Recent input" />
        {getRecentTransactionsQuery?.data?.length ? (
          <TransactionList
            isLoading={getRecentTransactionsQuery.isLoading}
            transactions={getRecentTransactionsQuery.data}
          />
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Add Transaction | {AppTitle}</title>
      </Helmet>
      <CurrentBookPanel />
      <PageTitle title="Add transaction" />
      {getAuthUserQuery.data?.active_book ? renderContent() : null}
    </>
  );
};

export default AddTransactionPage;
