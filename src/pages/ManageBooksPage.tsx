import { Book } from "../types";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useForm } from "react-hook-form";
import PageTitle from "../components/PageTitle";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useCreateBookMutation from "../services/useCreateBookMutation";
import BookCard from "../components/BookCard";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";
import useUpsertUserConfigMutation from "../services/useUpsertUserConfigMutation";
import { Helmet } from "react-helmet";
import { AppTitle } from "../constants";

const ManageBooksPage = () => {
  const ownedBooksState = useGetOwnedBooksQuery();
  const createBookMutation = useCreateBookMutation();
  const getAuthUserState = useGetAuthUserQuery();
  const getUserConfigQuery = useGetUserConfigQuery();
  const upsertUserConfigMutation = useUpsertUserConfigMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    if (getAuthUserState?.data?.id) {
      createBookMutation.mutate({
        title: data.title,
        owner: getAuthUserState.data.id,
      });
    }
  };

  const onBookActivated = (book_id: number) => {
    if (getAuthUserState?.data?.id) {
      upsertUserConfigMutation.mutate({
        user_id: getAuthUserState.data.id,
        active_book_id: book_id,
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
      <Helmet>
        <title>Manage Books | {AppTitle}</title>
      </Helmet>
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
        {ownedBooksState.isSuccess && (
          <div>
            {ownedBooksState.data.map((book: Book) => (
              <BookCard
                onActivate={onBookActivated}
                isActive={
                  getUserConfigQuery &&
                  getUserConfigQuery.data &&
                  getUserConfigQuery.data.active_book_id === book.id
                }
                book={book}
                key={book.id}
              />
            ))}
          </div>
        )}
        {upsertUserConfigMutation.isLoading && (
          <LoadingSpinner isOverlayed={true} />
        )}
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
