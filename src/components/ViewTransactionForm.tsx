import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";
import Heading3 from "./Heading3";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useCreateTransactionMutation from "../services/useCreateTransactionMutation";
import { CreateTransactionMutationPayload, Transaction } from "../types";

interface ViewTransactionFormProps {
  transaction: Transaction;
  cancelFn: () => void;
}

const ViewTransactionForm = ({
  transaction,
  cancelFn,
}: ViewTransactionFormProps) => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const renderFinalMarkup = () => {
    return (
      <>
        <div className="AddTransactionForm">
          <div className="FormRowTwoColumnWrapper">
            <div className="FormRow">
              <label className="FieldLabel">Date</label>
              <input
                value={transaction.tx_date}
                className="InputText"
                disabled
                type="text"
              />
            </div>
            <div className="FormRow">
              <label className="FieldLabel">Type</label>
              <input
                value={transaction.is_outgoing ? "Outgoing" : "Incoming"}
                className="InputText"
                disabled
                type="text"
              />
            </div>
          </div>
          <div className="FormRow">
            <label className="FieldLabel">Title</label>
            <input
              value={transaction.title}
              className="InputText"
              type="text"
              disabled
            />
          </div>
          <div className="FormRow">
            <label className="FieldLabel">Amount</label>
            <input
              value={transaction.amount}
              className="InputText"
              type="text"
              disabled
            />
          </div>
          <div className="FormRow">
            <label className="FieldLabel">Description</label>
            <textarea
              disabled
              className="InputText"
              value={transaction.description || ""}
            ></textarea>
          </div>
          <div className="FormRow">
            <label className="FieldLabel">Added by</label>
            <input
              value={transaction.creator_id}
              className="InputText"
              disabled
              type="text"
            />
          </div>
          <div className="FormRow AddTransactionForm__actionGroup">
            <button
              type="button"
              onClick={cancelFn}
              className="ButtonSecondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  };

  return renderFinalMarkup();
};

export default ViewTransactionForm;
