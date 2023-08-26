import { Book, Page } from "../types";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useForm } from "react-hook-form";
import PageTitle from "../components/PageTitle";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import usePage from "../hooks/usePage";
import { useCreateBookMutation } from "../services/supabase";
import VarDump from "../components/VarDump";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";

const ManageBooksPage = () => {
  const { switchPage } = usePage();
  const ownedBooksState = useGetOwnedBooksQuery();
  const [createBook, createBookState] = useCreateBookMutation();
  const getAuthUserState = useGetAuthUserQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    if (getAuthUserState.data) {
      createBook({ title: data.title, owner: getAuthUserState.data.id });
    }
  };

  useEffect(() => {
    if (createBookState.isSuccess) {
      setValue("title", "");
    }
  }, [createBookState]);

  return (
    <>
      <div>
        <button
          onClick={() => {
            switchPage(Page.DASHBOARD);
          }}
        >
          goto the dashboard
        </button>
      </div>
      <VarDump content={JSON.stringify(createBookState)} />
      <VarDump content={JSON.stringify(getAuthUserState)} />
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

        {createBookState.isLoading && <LoadingSpinner isOverlayed={true} />}
      </form>

      <hr />

      <div className="relative">
        <SectionTitle title="Owned books" />
        <VarDump content={JSON.stringify(ownedBooksState)} />
        {/* <ul>
          {ownedBooksState.data.map((book: Book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul> */}
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
