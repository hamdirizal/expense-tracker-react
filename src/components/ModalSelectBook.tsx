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
import ErrorDiv from "./ErrorDiv";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "../constants";

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

  const onBookActivated = (book_id: number) => {
    navigate(AppPaths.BOOK_DASHBOARD.replace(":book_id", book_id.toString()));
    closeFn();
  };

  useEffect(() => {
    if (createBookMutation.isSuccess) {
      setValue("title", "");
    }
  }, [createBookMutation]);

  const renderOwnedBooksSection = () => {
    return (
      <div className="ModalSelectBook__section">
        <div className="mb-2">
          <h3 className="ModalSelectBook__subtitle">Owned books</h3>
        </div>
        {getOwnedBooksQuery.isError && (
          <ErrorDiv error={getOwnedBooksQuery.error.message} />
        )}
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
    );
  };

  const renderCollaboratedBooksSection = () => {
    return (
      <div className="ModalSelectBook__section">
        <div className="mb-1">
          <h3 className="ModalSelectBook__subtitle">Collaborated books</h3>
        </div>
        {getCollaboratedBooksQuery.isError && (
          <ErrorDiv error={getCollaboratedBooksQuery.error.message} />
        )}
        {getCollaboratedBooksQuery.isSuccess &&
        getCollaboratedBooksQuery.data.length ? (
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
        ) : null}
        {getCollaboratedBooksQuery.isSuccess &&
        getCollaboratedBooksQuery.data.length === 0 ? (
          <div>You are not collaborating on any books.</div>
        ) : null}

        {setActiveBookMutation.isLoading && (
          <LoadingSpinner isOverlayed={true} />
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="ModalSelectBook">
        <h2 className="ModalSelectBook__title">Select or create book</h2>

        <form
          action=""
          onSubmit={handleSubmit((data) => onFormSubmitted(data))}
          className="relative border border-grey-input-border bg-grey-bg-2 rounded px-4 pt-3 pb-5"
        >
          <div className="ModalSelectBook__newBookForm">
            <input
              className="InputText"
              required
              type="text"
              placeholder="Book title"
              {...register("title", { required: true })}
            />
            <div className="ModalSelectBook__submitButton">
              <button type="submit" className="ButtonPrimary">
                Create new book
              </button>
            </div>
          </div>

          {createBookMutation.isLoading && (
            <LoadingSpinner isOverlayed={true} />
          )}
        </form>

        {renderOwnedBooksSection()}

        {renderCollaboratedBooksSection()}
      </div>
    );
  };

  return <Modal isOpen={isOpen} closeFn={closeFn} content={renderContent()} />;
};

export default ModalSelectBook;
