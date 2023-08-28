import useCreateBookMutation from "../services/useCreateBookMutation";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";
import useUpsertUserConfigMutation from "../services/useUpsertUserConfigMutation";
import { Book } from "../types";
import BookCard from "./BookCard";
import Heading3 from "./Heading3";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";

interface ModalSelectBookProps {
  isOpen: boolean;
  closeFn: () => void;
}

const ModalSelectBook = ({ isOpen, closeFn }: ModalSelectBookProps) => {
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

  const renderContent = () => {
    return (
      <>
        <Heading3 title="Select or create a book" />

        <form
          action=""
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

          {createBookMutation.isLoading && (
            <LoadingSpinner isOverlayed={true} />
          )}
        </form>

        <div className="relative">
          <Heading3 title="Owned books" />
          {ownedBooksState.isSuccess && (
            <div>
              {ownedBooksState.data.map((book: Book) => (
                <BookCard
                  onActivate={onBookActivated}
                  isActive={
                    getUserConfigQuery?.data?.active_book_id === book.id
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

        <div>
          <Heading3 title="Collaborated books" />
          <ul>
            <li>first</li>
            <li>Second</li>
            <li>Third</li>
          </ul>
        </div>
      </>
    );
  };

  return <Modal isOpen={isOpen} closeFn={closeFn} content={renderContent()} />;
};

export default ModalSelectBook;
