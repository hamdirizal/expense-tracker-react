import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookItemList from "../components/BookItemList";
import CreateBookForm from "../components/CreateBookForm";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import { getStoredDefaultBookId } from "../helpers/storageHelper";
import useGetCollaboratedBooksQuery from "../services/useGetCollaboratedBooksQuery";
import useGetInvitationsQuery from "../services/useGetInvitationsQuery";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";

const DashboardPage = () => {
  const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const getCollaboratedBooksQuery = useGetCollaboratedBooksQuery();
  const storedDefaultBookId = getStoredDefaultBookId();
  const getInvitationsQuery = useGetInvitationsQuery();
  const navigate = useNavigate();
  const [defaultBookId, setDefaultBookId] = useState<number>(0);

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
            <span>{Texts.DASHBOARD}</span>
          </li>
        </ul>

        <CreateBookForm />

        <div className="Heading3">📚 {Texts.MY_BOOKS}</div>
        {getOwnedBooksQuery.data?.results?.length ? (
          <BookItemList books={getOwnedBooksQuery.data.results} />
        ) : (
          <div>{Texts.NO_OWNED_BOOKS}</div>
        )}

        <div className="HSpace2"></div>
        <div className="Heading3">🤝 {Texts.COLLABORATED_BOOKS}</div>
        {getCollaboratedBooksQuery.data?.results?.length ? (
          <BookItemList
            books={getCollaboratedBooksQuery.data.results}
            showOwner={true}
          />
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
