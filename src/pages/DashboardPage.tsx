import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

import BookItemList from "../components/BookItemList";
import BookList from "../components/BookList";
import CreateBookForm from "../components/CreateBookForm";
import { AppPaths, Texts } from "../constants";
import { getStoredDefaultBookId } from "../helpers/storageHelper";
import useGetCollaboratedBooksQuery from "../services/useGetCollaboratedBooksQuery";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";

const DashboardPage = () => {
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
        {getOwnedBooksQuery.data?.length ? (
          <BookItemList books={getOwnedBooksQuery.data} />
        ) : (
          <div>{Texts.NO_OWNED_BOOKS}</div>
        )}

        <div className="HSpace2"></div>
        <div className="Heading3">🤝 {Texts.COLLABORATED_BOOKS}</div>
        {getCollaboratedBooksQuery.data?.length ? (
          <BookList books={getCollaboratedBooksQuery.data} />
        ) : (
          <div>{Texts.NO_COLLABORATED_BOOKS}</div>
        )}
        <div className="HSpace2"></div>
        <div className="Heading3">✉️ {Texts.INVITATIONS}</div>
        <div>{Texts.NO_INVITATIONS}</div>
      </div>
    );
  }
};

export default DashboardPage;
