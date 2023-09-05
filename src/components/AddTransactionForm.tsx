import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";
import Heading3 from "./Heading3";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useCreateTransactionMutation from "../services/useCreateTransactionMutation";
import { CreateTransactionMutationPayload, Transaction } from "../types";

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
          <div className="">
            <input
              className="myapp-input-text"
              required
              type="number"
              placeholder="Amount"
              {...register("amount", { required: true })}
            />
            <br />
            <div>
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
            <textarea
              placeholder="Description"
              {...register("description")}
              className="myapp-textarea"
            ></textarea>
            <div className="">
              <Button
                isFullWidth={false}
                size="regular"
                label="Cancel"
                variant="primary"
                onClick={cancelFn}
                type="button"
              />

              <Button
                isFullWidth={false}
                size="regular"
                label="Create transaction"
                variant="primary"
                onClick={() => {}}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    );
  };

  return renderFinalMarkup();
};

export default AddTransactionForm;
