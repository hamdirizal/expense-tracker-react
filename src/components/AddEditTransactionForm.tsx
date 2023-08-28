import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";
import Heading3 from "./Heading3";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";
import useCreateTransactionMutation from "../services/useCreateTransactionMutation";
import { CreateTransactionMutationPayload } from "../types";

const AddEditTransactionForm = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const getUserConfigQuery = useGetUserConfigQuery();
  const createTransactionMutation = useCreateTransactionMutation();

  console.log("CURRENTBOOK ID", getUserConfigQuery.data?.active_book_id);

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
    const payload: CreateTransactionMutationPayload = {
      ...data,
      book_id: getUserConfigQuery.data?.active_book_id,
      creator_id: getAuthUserQuery.data?.id,
    };
    console.log("PAYLOAD", payload);
    createTransactionMutation.mutate(payload);
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
          <div>Create new book</div>
          <div className="">
            <input
              className="border-2 border-gray-400 mr-3"
              required
              type="date"
              placeholder="Date"
              {...register("date", { required: true })}
            />
            <br />
            <input
              className="border-2 border-gray-400 mr-3"
              required
              type="text"
              placeholder="Transaction title"
              {...register("title", { required: true })}
            />
            <br />
            <input
              className="border-2 border-gray-400 mr-3"
              required
              type="number"
              placeholder="Amount"
              {...register("amount", { required: true })}
            />
            <br />
            <div>
              <label>
                <input
                  type="radio"
                  value="no"
                  {...register("is_outgoing", { required: true })}
                />
                Incoming
              </label>
              <label>
                <input
                  type="radio"
                  value="yes"
                  {...register("is_outgoing", { required: true })}
                />
                Outgoing
              </label>
            </div>
            <input
              className="border-2 border-gray-400 mr-3"
              type="text"
              placeholder="Description"
              {...register("description")}
            />
            <br />
            <div className="w-[200px]">
              <Button
                label="Create transaction"
                variant="primary"
                onClick={() => {}}
                type="submit"
              />
            </div>
          </div>
        </form>
        <br />
        <br />
        <form action="" className="border border-red-500">
          <div className="flex">
            <label>
              <input type="Checkbox" className="mr-2" />
              <span>Delete transaction</span>
            </label>
          </div>
          <p>This action cannot be undone.</p>
          <div>
            <button>Confirm deletion</button>
          </div>
        </form>
      </>
    );
  };

  if (getUserConfigQuery.data?.active_book) {
    return renderFinalMarkup();
  } else {
    return null;
  }
};

export default AddEditTransactionForm;
