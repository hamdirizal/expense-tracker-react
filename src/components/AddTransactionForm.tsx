import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Texts } from "../constants";
import useCreateTransactionMutation from "../services/useCreateTransactionMutation";

interface AddTransactionFormProps {
  bookId: number;
  cancelFn: () => void;
}

const AddTransactionForm = ({ bookId }: AddTransactionFormProps) => {
  const createTransactionMutation = useCreateTransactionMutation();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      is_outgoing: true,
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
      is_outgoing: data.is_outgoing === true,
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
      setValue("is_outgoing", true);
    }
  };

  useEffect(onDataCreated, [createTransactionMutation]);
  const renderFinalMarkup = () => {
    return (
      <div>
        <form
          action=""
          onSubmit={handleSubmit((data) => onFormSubmitted(data))}
          className="relative"
        >
          <div className="FormRow">
            <label className="FieldLabel">Type</label>
            <select
              className="InputSelect InputSelect--short"
              {...register("is_outgoing", { required: true })}
            >
              <option value={"false"}>{Texts.INCOMING}</option>
              <option value={"true"}>{Texts.OUTGOING}</option>
            </select>
          </div>
          <div className="FormRow">
            <label className="FieldLabel">Date</label>
            <input
              className="InputText InputText--short"
              required
              type="date"
              {...register("date", { required: true })}
            />
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
          <div className="FormRow">
            <button type="submit" className="ButtonRegular">
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
