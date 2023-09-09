import { useForm } from "react-hook-form";

import { Texts } from "../constants";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";

const SearchTransactionsForm = () => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    if (getAuthUserQuery?.data?.id) {
      // createBookMutation.mutate({
      //   book_title: data.title,
      // });
    }
  };

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
        <button
          type="submit"
          className="ButtonRegular SearchTransactionsForm__button"
        >
          {Texts.SEARCH}
        </button>
      </form>
    );
  };

  return <div className="SearchTransactionsForm">{renderFormMarkup()}</div>;
};

export default SearchTransactionsForm;
