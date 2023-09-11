import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

import EditTransactionForm from "../components/EditTransactionForm";
import ErrorDiv from "../components/ErrorDiv";
import ViewTransactionForm from "../components/ViewTransactionForm";
import { Texts } from "../constants/texts";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useGetSingleTransactionQuery from "../services/useGetSingleTransactionQuery";

const ViewTransactionPage = () => {
  const navigate = useNavigate();
  useGetAuthUserQuery();

  const { transaction_id } = useParams();
  const tx_id = transaction_id ? parseInt(transaction_id) : 0;
  const getSingleTransactionQuery = useGetSingleTransactionQuery(tx_id);

  const renderContent = () => {
    return (
      <div className="ViewTransactionPage">
        <h1 className="PageTitle">View transaction</h1>

        {getSingleTransactionQuery.data?.is_editable ? null : (
          <div className="ViewTransactionPage__message">
            You are not allowed to edit this item
          </div>
        )}

        {getSingleTransactionQuery.data?.is_editable ? (
          <EditTransactionForm
            transaction={getSingleTransactionQuery.data}
            cancelFn={() => navigate(-1)}
          />
        ) : null}

        {getSingleTransactionQuery.data &&
        !getSingleTransactionQuery.data.is_editable ? (
          <ViewTransactionForm transaction={getSingleTransactionQuery.data} />
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {Texts.VIEW_TRANSACTION} | {Texts.APP_TITLE}
        </title>
      </Helmet>

      {getSingleTransactionQuery.isSuccess ? renderContent() : null}

      {getSingleTransactionQuery.isError ? (
        <ErrorDiv error={getSingleTransactionQuery.error.message} />
      ) : null}
    </>
  );
};

export default ViewTransactionPage;
