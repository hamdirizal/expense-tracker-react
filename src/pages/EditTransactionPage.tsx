import { Helmet } from "react-helmet";
import { AppTitle } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";
import AddEditTransactionForm from "../components/AddEditTransactionForm";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import Heading1 from "../components/Heading1";
import useGetSingleTransactionQuery from "../services/useGetSingleTransactionQuery";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorDiv from "../components/ErrorDiv";

const EditTransactionPage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const activeBookId = getAuthUserQuery.data?.active_book_id || 0;

  const { transaction_id } = useParams();
  const tx_id = transaction_id ? parseInt(transaction_id) : 0;
  const getSingleTransactionQuery = useGetSingleTransactionQuery(tx_id);

  const renderContent = () => {
    return (
      <>
        <div className="mt-6">
          <Heading1 title="Edit transaction" />
        </div>
        {getSingleTransactionQuery.data?.is_editable === "yes" ? null : (
          <div>You're not allowed to edit this item.</div>
        )}

        <div>
          <AddEditTransactionForm
            transaction={getSingleTransactionQuery?.data || null}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Edit Transaction | {AppTitle}</title>
      </Helmet>

      {getSingleTransactionQuery.isSuccess ? renderContent() : null}
      {getSingleTransactionQuery.isError ? (
        <ErrorDiv error={getSingleTransactionQuery.error.message} />
      ) : null}
    </>
  );
};

export default EditTransactionPage;
