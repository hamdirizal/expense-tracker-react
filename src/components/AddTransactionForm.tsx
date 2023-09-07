import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";
import Heading3 from "./Heading3";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useCreateTransactionMutation from "../services/useCreateTransactionMutation";
import { CreateTransactionMutationPayload, Transaction } from "../types";
import { Texts } from "../constants";

interface AddTransactionFormProps {
  bookId: number;
  cancelFn: () => void;
}

const AddTransactionForm = ({ bookId, cancelFn }: AddTransactionFormProps) => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const createTransactionMutation = useCreateTransactionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      is_outgoing: "yes",
      date: new Date().toISOString().split("T")[0],
      title: "",
      description: "",
      amount: "",
    },
  });

  const onFormSubmitted = (data: any) => {
    createTransactionMutation.mutate({
      book_id: bookId,
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
              {...register("amount", { required: true })}
            />
          </div>

          <div className="FormRow">
            <label className="FieldLabel">Description</label>
            <textarea
              {...register("description")}
              className="InputText"
            ></textarea>
          </div>
          <div className="FormRow AddTransactionForm__actionGroup">
            <button
              type="button"
              onClick={cancelFn}
              className="ButtonSecondary"
            >
              {Texts.CANCEL}
            </button>
            <button type="submit" className="ButtonPrimary">
              {Texts.SUBMIT}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return renderFinalMarkup();
};

export default AddTransactionForm;
