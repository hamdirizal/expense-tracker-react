import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCreateBookMutation from "../services/useCreateBookMutation";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useSetActiveBookMutation from "../services/useSetActiveBookMutation";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetCollaboratedBooksQuery from "../services/useGetCollaboratedBooksQuery";
import { useForm } from "react-hook-form";
import { AppPaths, Texts } from "../constants";
import LoadingSpinner from "./LoadingSpinner";

const CreateBookForm = () => {
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
        className="CreateBookForm__form"
      >
        <input
          className="InputText CreateBookForm__input"
          required
          type="text"
          placeholder="Book title"
          {...register("title", { required: true })}
        />
        <button type="submit" className="ButtonRegular CreateBookForm__button">
          {Texts.SUBMIT}
        </button>
      </form>
    );
  };

  return (
    <div className="CreateBookForm">
      <div className="Heading3">📗 {Texts.CREATE_NEW_BOOK}</div>
      {createBookMutation.isLoading ? (
        <LoadingSpinner isOverlayed={true} />
      ) : (
        renderFormMarkup()
      )}
    </div>
  );
};

export default CreateBookForm;
