import { useForm } from "react-hook-form";

import { Texts } from "../constants";

const SearchTransactionsForm = () => {

  const { register, handleSubmit } = useForm();

  const renderFormMarkup = () => {
    return (
      <form
        action=""
        onSubmit={handleSubmit(() => {})}
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
