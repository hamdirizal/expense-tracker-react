import { Link, useParams } from "react-router-dom";

import SearchTransactionsForm from "../components/SearchTransactionsForm";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import useGetCollaboratorsQuery from "../services/useGetCollaboratorsQuery";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";

const CollaboratorsPage = () => {
  const { book_id } = useParams();

  const getSingleBookQuery = useGetSingleBookQuery(parseInt(book_id || "0"));
  const getCollaboratorsQuery = useGetCollaboratorsQuery(
    parseInt(book_id || "0")
  );

  return (
    <>
      <ul className="Breadcrumbs">
        <li>
          <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
        </li>
        <li>
          <Link to={AppPaths.BOOK_SINGLE.replace(/:book_id/, book_id || "")}>
            {getSingleBookQuery.data?.title || ""}
          </Link>
        </li>
        <li>
          <span>{Texts.COLLABORATORS}</span>
        </li>
      </ul>

      <div className="Heading3">👥 Active Collaborators</div>
      {getCollaboratorsQuery.data?.results?.length ? (
        <div className="RegularList">
          <ul className="RegularList__ul">
            {getCollaboratorsQuery.data.results.map((user) => {
              return (
                <li key={user.id} className="RegularList__li">
                  {user.email}{" "}
                  {user.nickname ? <span>({user.nickname})</span> : null}{" "}
                  <button type="button" className="ButtonLink">
                    remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>No collaborators for this book</div>
      )}

      <div className="HSpace2"></div>
      <div className="Heading3">⏳ Pending Invitation</div>
      <div data-testid="BookItemList" className="RegularList">
        <ul className="RegularList__ul">
          <li className="RegularList__li">john@email.com cancel</li>
          <li className="RegularList__li">susann@email.com cancel</li>
        </ul>
      </div>
      <div className="HSpace2"></div>
      <div className="Heading3">✉️ Invite another person</div>
      <div>
        <input type="text" />
        <button>Invite</button>
      </div>
    </>
  );
};

export default CollaboratorsPage;
