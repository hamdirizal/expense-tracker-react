import { Book, Page } from "../types";
import { useContext, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useForm } from "react-hook-form";
import PageTitle from "../components/PageTitle";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import VarDump from "../components/VarDump";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useCreateBookMutation from "../services/useCreateBookMutation";
import { PageContext } from "../App";

const ManageBooksPage = () => {
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const ownedBooksState = useGetOwnedBooksQuery();
  const createBookMutation = useCreateBookMutation();
  const getAuthUserState = useGetAuthUserQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    if (getAuthUserState.data) {
      createBookMutation.mutate({
        title: data.title,
        owner: getAuthUserState.data.user.id,
      });
    }
  };

  useEffect(() => {
    if (createBookMutation.isSuccess) {
      setValue("title", "");
    }
  }, [createBookMutation]);

  return (
    <>
      <div>
        <button
          onClick={() => {
            setCurrentPage(Page.DASHBOARD);
          }}
        >
          goto the dashboard
        </button>
      </div>
      <PageTitle title="Manage books" />
      <form
        action="#hello"
        onSubmit={handleSubmit((data) => onFormSubmitted(data))}
        className="relative"
      >
        <div>Create new book</div>
        <div className="flex">
          <input
            className="border-2 border-gray-400 mr-3"
            required
            type="text"
            placeholder="Book title"
            {...register("title", { required: true })}
          />
          <div className="w-[200px]">
            <Button
              label="Create book"
              variant="primary"
              onClick={() => {}}
              type={"submit"}
            />
          </div>
        </div>

        {createBookMutation.isLoading && <LoadingSpinner isOverlayed={true} />}
      </form>

      <hr />

      <div className="relative">
        <SectionTitle title="Owned books" />
        <ul>
          {ownedBooksState.data.map((book: Book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
        {ownedBooksState.isLoading && <LoadingSpinner isOverlayed={true} />}
      </div>
      <SectionTitle title="Collaborated books" />
      <ul>
        <li>first</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
    </>
  );
};

export default ManageBooksPage;
