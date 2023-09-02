import CurrentBookPanel from "../components/CurrentBookPanel";
import PageTitle from "../components/PageTitle";
import SectionTitle from "../components/SectionTitle";
import TransactionList from "../components/TransactionList";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";

const DashboardHomePage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const activeBookId = useGetAuthUserQuery.data?.active_book_id || 0;
  const getRecentTransactionsQuery =
    useGetRecentTransactionsQuery(activeBookId);
  return (
    <div>
      <CurrentBookPanel />
      <PageTitle title="Dashboard" />
      <SectionTitle title="Recent input" />
      {getRecentTransactionsQuery.data?.length ? (
        <TransactionList
          isLoading={getRecentTransactionsQuery.isLoading}
          transactions={getRecentTransactionsQuery.data}
        />
      ) : null}
    </div>
  );
};

export default DashboardHomePage;
