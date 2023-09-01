import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";
import Heading3 from "./Heading3";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";
import useCreateTransactionMutation from "../services/useCreateTransactionMutation";
import { CreateTransactionMutationPayload } from "../types";

interface AddEditTransactionFormProps {
  isEditing: boolean;
}

const AddEditTransactionForm = ({ isEditing }: AddEditTransactionFormProps) => {
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
      date: "2021-10-10",
      title: "",
      description: "",
      amount: "",
    },
  });

  const onFormSubmitted = (data: any) => {
    createTransactionMutation.mutate({
      tx_date: data.date,
      is_outgoing: data.is_outgoing,
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
      <>
        <form
          action=""
          onSubmit={handleSubmit((data) => onFormSubmitted(data))}
          className="relative"
        >
          <div className="">
            <input
              className="myapp-input-text myapp-outline"
              required
              type="date"
              placeholder="Date"
              {...register("date", { required: true })}
            />
            <br />
            <input
              className="myapp-input-text myapp-outline"
              required
              type="text"
              placeholder="Transaction title"
              {...register("title", { required: true })}
            />
            <br />
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
            <br />
            <br />
            <div>
              <input type="checkbox" className="myapp-checkbox mr-3" />
              Delete this transaction
            </div>
            <br />
            <br />
            <div className="w-[200px]">
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
      </>
    );
  };

  if (getAuthUserQuery.data?.active_book) {
    return renderFinalMarkup();
  } else {
    return null;
  }
};

export default AddEditTransactionForm;
