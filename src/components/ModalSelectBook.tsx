import useCreateBookMutation from "../services/useCreateBookMutation";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import { Book } from "../types";
import BookCard from "./BookCard";
import Heading3 from "./Heading3";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";
import Heading2 from "./Heading2";
import useSetActiveBookMutation from "../services/useSetActiveBookMutation";
import useGetCollaboratedBooksQuery from "../services/useGetCollaboratedBooksQuery";

interface ModalSelectBookProps {
  isOpen: boolean;
  closeFn: () => void;
}

const ModalSelectBook = ({ isOpen, closeFn }: ModalSelectBookProps) => {
  const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const getCollaboratedBooksQuery = useGetCollaboratedBooksQuery();
  const createBookMutation = useCreateBookMutation();
  const getAuthUserQuery = useGetAuthUserQuery();
  const setActiveBookMutation = useSetActiveBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    if (getAuthUserQuery?.data?.id) {
      createBookMutation.mutate({
        title: data.title,
        owner: getAuthUserQuery.data.id,
      });
    }
  };

  const onBookActivated = (book_id: number) => {
    if (getAuthUserQuery?.data?.id) {
      setActiveBookMutation.mutate({
        book_id: book_id,
      });
    }
    closeFn();
  };

  useEffect(() => {
    if (createBookMutation.isSuccess) {
      setValue("title", "");
    }
  }, [createBookMutation]);

  const renderCollaboratedBooksSection = () => {
    return (
      <div className="relative mt-6">
        <div className="mb-1">
          <Heading3 title="Collaborated books" />
        </div>
        {getCollaboratedBooksQuery.isSuccess &&
        getCollaboratedBooksQuery.data?.length ? (
          <div>
            {getCollaboratedBooksQuery.data.map((book: Book) => (
              <BookCard
                onActivate={onBookActivated}
                isActive={getAuthUserQuery?.data?.active_book_id === book.id}
                book={book}
                key={book.id}
              />
            ))}
          </div>
        ) : (
          <div>You are not collaborating on any books.</div>
        )}
        {setActiveBookMutation.isLoading && (
          <LoadingSpinner isOverlayed={true} />
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div className="mb-3">
          <Heading2 title="Select or create a book" />
        </div>

        <form
          action=""
          onSubmit={handleSubmit((data) => onFormSubmitted(data))}
          className="relative border border-grey-input-border bg-grey-bg-2 rounded px-4 pt-3 pb-5"
        >
          <div className="mb-1">Create new book</div>
          <div className="flex">
            <input
              className="bg-grey-input-bg border text-white-text border-grey-input-border rounded w-full px-4 py-2 mr-3"
              required
              type="text"
              placeholder="Book title"
              {...register("title", { required: true })}
            />
            <div className="w-[240px]">
              <Button
                isFullWidth={true}
                size="regular"
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

        <div className="relative mt-4">
          <div className="mb-2">
            <Heading3 title="Owned books" />
          </div>
          {getOwnedBooksQuery.isSuccess && (
            <div>
              {getOwnedBooksQuery.data.map((book: Book) => (
                <BookCard
                  onActivate={onBookActivated}
                  isActive={getAuthUserQuery?.data?.active_book_id === book.id}
                  book={book}
                  key={book.id}
                />
              ))}
            </div>
          )}
          {setActiveBookMutation.isLoading && (
            <LoadingSpinner isOverlayed={true} />
          )}
        </div>

        {renderCollaboratedBooksSection()}
      </>
    );
  };

  return <Modal isOpen={isOpen} closeFn={closeFn} content={renderContent()} />;
};

export default ModalSelectBook;
