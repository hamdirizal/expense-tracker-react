import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getStoredDefaultBookId } from "../helpers/storageHelper";
import { AppPaths, Texts } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";
import ModalSelectBook from "../components/ModalSelectBook";
import CreateBookForm from "../components/CreateBookForm";
import BookList from "../components/BookList";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetCollaboratedBooksQuery from "../services/useGetCollaboratedBooksQuery";
import BookItemList from "../components/BookItemList";

const BookWelcomPage = () => {
  const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const getCollaboratedBooksQuery = useGetCollaboratedBooksQuery();
  const storedDefaultBookId = getStoredDefaultBookId();
  const navigate = useNavigate();
  const [defaultBookId, setDefaultBookId] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setDefaultBookId(storedDefaultBookId);
  }, []);

  if (defaultBookId) {
    navigate(
      AppPaths.BOOK_SINGLE.replace(/:book_id/g, defaultBookId.toString())
    );
  } else {
    return (
      <div>
        <ul className="Breadcrumbs">
          <li>
            ⚓ <span>{Texts.DASHBOARD}</span>
          </li>
        </ul>

        <CreateBookForm />

        <div className="Heading3">📚 {Texts.MY_BOOKS}</div>
        {getOwnedBooksQuery.data ? (
          <BookItemList books={getOwnedBooksQuery.data} />
        ) : (
          <div>You don't have any book</div>
        )}

        <div className="HSpace2"></div>
        <div className="Heading3">🤝 {Texts.COLLABORATED_BOOKS}</div>
        {getCollaboratedBooksQuery.data ? (
          <BookList books={getCollaboratedBooksQuery.data} />
        ) : (
          <div>You don't have any book</div>
        )}
        <div className="HSpace2"></div>
        <div className="Heading3">✉️ {Texts.INVITATIONS}</div>
      </div>
    );
  }
};

export default BookWelcomPage;
