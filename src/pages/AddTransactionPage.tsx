import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PageTitle from "../components/PageTitle";
import { AppTitle } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";
import TransactionList from "../components/TransactionList";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import { useQuery } from "@tanstack/react-query";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";
import { supabaseClient } from "../main";
import VarDump from "../components/VarDump";
import SectionTitle from "../components/SectionTitle";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";

const AddTransactionPage = () => {
  const getUserConfigQuery = useGetUserConfigQuery();
  const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const activeBookId = getUserConfigQuery?.data?.active_book_id || null;
  const getRecentTransactionsQuery =
    useGetRecentTransactionsQuery(activeBookId);

  return (
    <>
      <Helmet>
        <title>Add Transaction | {AppTitle}</title>
      </Helmet>
      <CurrentBookPanel />
      <PageTitle title="Add transaction" />
      <hr />
      <VarDump content={JSON.stringify(getOwnedBooksQuery.data)} />
      <hr />
      <div>
        <SectionTitle title="Recent input" />
        {getRecentTransactionsQuery?.data?.length ? (
          <TransactionList
            isLoading={getRecentTransactionsQuery.isLoading}
            transactions={getRecentTransactionsQuery.data}
          />
        ) : null}
      </div>
    </>
  );
};

export default AddTransactionPage;
