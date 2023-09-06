import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";
import Heading3 from "./Heading3";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useCreateTransactionMutation from "../services/useCreateTransactionMutation";
import { CreateTransactionMutationPayload, Transaction } from "../types";

interface EditTransactionFormProps {
  transaction: Transaction;
  cancelFn: () => void;
}

const EditTransactionForm = ({
  transaction,
  cancelFn,
}: EditTransactionFormProps) => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const createTransactionMutation = useCreateTransactionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    createTransactionMutation.mutate({
      book_id: 0,
      tx_date: data.date,
      is_outgoing: data.is_outgoing === "yes",
      title: data.title,
      description: data.description,
      amount: data.amount,
    });
  };

  const onDataCreated = () => {
    if (
      !createTransactionMutation.isLoading &&
      createTransactionMutation.isSuccess
    ) {
      setValue("title", "");
      setValue("description", "");
      setValue("amount", "");
    }
  };

  useEffect(onDataCreated, [createTransactionMutation]);
  const renderFinalMarkup = () => {
    return (
      <div className="AddTransactionForm">
        <form
          action=""
          onSubmit={handleSubmit((data) => onFormSubmitted(data))}
          className="relative"
        >
          <div className="FormRowTwoColumnWrapper">
            <div className="FormRow">
              <label className="FieldLabel">Date</label>
              <input
                className="InputText"
                value={transaction.tx_date}
                required
                type="date"
                {...register("date", { required: true })}
              />
            </div>
            <div className="FormRow">
              <label className="FieldLabel">Type</label>
              <select className="InputSelect">
                <option value="">Incoming</option>
                <option value="">Outgoing</option>
              </select>
            </div>
          </div>

          <div className="FormRow">
            <label className="FieldLabel">Title</label>
            <input
              className="InputText"
              value={transaction.title}
              required
              type="text"
              {...register("title", { required: true })}
            />
          </div>
          <div className="FormRow">
            <label className="FieldLabel">Amount</label>
            <input
              className="InputText"
              required
              type="number"
              value={transaction.amount}
              {...register("amount", { required: true })}
            />
          </div>
          <div className="FormRow">
            <label className="FieldLabel">Description</label>
            <textarea
              value={transaction.description || ""}
              {...register("description")}
              className="InputText"
            ></textarea>
          </div>
          <div className="FormRow">
            <label className="FieldLabel">Added by</label>
            <input
              className="InputText"
              value={transaction.creator_id}
              type="text"
              disabled
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
            <button type="submit" className="ButtonPrimary">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  };

  return renderFinalMarkup();
};

export default EditTransactionForm;
