import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";
import Heading3 from "./Heading3";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useCreateTransactionMutation from "../services/useCreateTransactionMutation";
import { CreateTransactionMutationPayload, Transaction } from "../types";

interface EditTransactionFormProps {
  bookId: number;
  cancelFn: () => void;
}

const EditTransactionForm = ({ bookId, cancelFn }: EditTransactionFormProps) => {
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
          <div className="FormRow">
            You are not allowed to edit this transaction.
          </div>
          <div className="FormRow">
            Transaction older than 14 days cannot be edited.
          </div>
          <div className="FormRow">
            Transaction ID: 2
          </div>
          <div className="FormRow">
            Created by: Eline
          </div>
          <div className="FormRow">
            <input
              className="InputText"
              required
              type="date"
              placeholder="Date"
              {...register("date", { required: true })}
            />
          </div>
          <div className="FormRow">
            <input
              className="InputText"
              required
              type="text"
              placeholder="Transaction title"
              {...register("title", { required: true })}
            />
          </div>
          <div className="FormRow">
            <input
              className="InputText"
              required
              type="number"
              placeholder="Amount"
              {...register("amount", { required: true })}
            />
          </div>
          <div className="FormRow">
            <label className="mr-6">
              <input
                className="myapp-radio mr-3"
                type="radio"
                value="no"
                {...register("is_outgoing", { required: true })}
              />
              Incoming
            </label>
            <label>
              <input
                className="myapp-radio mr-3"
                type="radio"
                value="yes"
                {...register("is_outgoing", { required: true })}
              />
              Outgoing
            </label>
          </div>
          <div className="FormRow">
            <textarea
              placeholder="Description"
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
              Cancel
            </button>
            <button type="submit" className="ButtonPrimary">
              Update
            </button>
          </div>
          <div className="">
            <br />
            <div></div>

            <div className=""></div>
          </div>
        </form>
      </div>
    );
  };

  return renderFinalMarkup();
};

export default EditTransactionForm;
