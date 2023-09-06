import { Helmet } from "react-helmet";
import { AppTitle } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";
import AddEditTransactionForm from "../components/AddEditTransactionForm";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import Heading1 from "../components/Heading1";
import useGetSingleTransactionQuery from "../services/useGetSingleTransactionQuery";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ErrorDiv from "../components/ErrorDiv";
import EditTransactionForm from "../components/EditTransactionForm";
import ViewTransactionForm from "../components/ViewTransactionForm";

const ViewTransactionPage = () => {
  const navigate = useNavigate();
  const getAuthUserQuery = useGetAuthUserQuery();
  const activeBookId = getAuthUserQuery.data?.active_book_id || 0;

  const { transaction_id } = useParams();
  const tx_id = transaction_id ? parseInt(transaction_id) : 0;
  const getSingleTransactionQuery = useGetSingleTransactionQuery(tx_id);

  const renderContent = () => {
    return (
      <div className="ViewTransactionPage">
        <h1 className="PageTitle">View transaction</h1>

        {getSingleTransactionQuery.data?.is_editable ? null : (
          <div className="ViewTransactionPage__message">You are not allowed to edit this item</div>
        )}

        {getSingleTransactionQuery.data?.is_editable ? (
          <EditTransactionForm
            transaction={getSingleTransactionQuery.data}
            cancelFn={() => navigate(-1)}
          />
        ) : null}

        {getSingleTransactionQuery.data &&
        !getSingleTransactionQuery.data.is_editable ? (
          <ViewTransactionForm
            cancelFn={() => navigate(-1)}
            transaction={getSingleTransactionQuery.data}
          />
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>View Transaction | {AppTitle}</title>
      </Helmet>

      {getSingleTransactionQuery.isSuccess ? renderContent() : null}

      {getSingleTransactionQuery.isError ? (
        <ErrorDiv error={getSingleTransactionQuery.error.message} />
      ) : null}
    </>
  );
};

export default ViewTransactionPage;
