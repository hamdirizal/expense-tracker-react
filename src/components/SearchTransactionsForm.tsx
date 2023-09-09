import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Texts } from "../constants";
import useCreateBookMutation from "../services/useCreateBookMutation";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useGetCollaboratedBooksQuery from "../services/useGetCollaboratedBooksQuery";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useSetActiveBookMutation from "../services/useSetActiveBookMutation";
import LoadingSpinner from "./LoadingSpinner";

const SearchTransactionsForm = () => {
  const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const getCollaboratedBooksQuery = useGetCollaboratedBooksQuery();
  const createBookMutation = useCreateBookMutation();
  const getAuthUserQuery = useGetAuthUserQuery();
  const setActiveBookMutation = useSetActiveBookMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    if (getAuthUserQuery?.data?.id) {
      createBookMutation.mutate({
        book_title: data.title,
      });
    }
  };

  useEffect(() => {
    if (createBookMutation.isSuccess) {
      setValue("title", "");
    }
  }, [createBookMutation]);

  const renderFormMarkup = () => {
    return (
      <form
        action=""
        onSubmit={handleSubmit((data) => onFormSubmitted(data))}
        className="SearchTransactionsForm__form"
      >
        <input
          className="InputText SearchTransactionsForm__input"
          required
          type="text"
          placeholder="Keyword"
          {...register("title", { required: true })}
        />
        <button type="submit" className="ButtonRegular SearchTransactionsForm__button">
          {Texts.SEARCH}
        </button>
      </form>
    );
  };

  return (
    <div className="SearchTransactionsForm">
      {createBookMutation.isLoading ? (
        <LoadingSpinner isOverlayed={true} />
      ) : (
        renderFormMarkup()
      )}
    </div>
  );
};

export default SearchTransactionsForm;
