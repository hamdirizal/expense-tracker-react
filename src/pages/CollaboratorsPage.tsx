import { Link, useParams } from "react-router-dom";

import SearchTransactionsForm from "../components/SearchTransactionsForm";
import SendInvitationForm from "../components/SendInvitationForm";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useGetCollaboratorsQuery from "../services/useGetCollaboratorsQuery";
import useGetOutgoingInvitationsQuery from "../services/useGetOutgoingInvitationsQuery";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";

const CollaboratorsPage = () => {
  const { book_id } = useParams();
  const getAuthUserQuery = useGetAuthUserQuery();
  const getSingleBookQuery = useGetSingleBookQuery(parseInt(book_id || "0"));
  const getCollaboratorsQuery = useGetCollaboratorsQuery(
    parseInt(book_id || "0")
  );
  const getOutgoingInvitationsQuery = useGetOutgoingInvitationsQuery(
    parseInt(book_id || "0")
  );

  const renderInvitationSection = () => {
    return (
      <>
        <div className="HSpace2"></div>
        <div className="Heading3">⏳ Pending Invitation</div>
        {getOutgoingInvitationsQuery?.data?.results?.length ? (
          <div className="RegularList">
            <ul className="RegularList__ul">
              {getOutgoingInvitationsQuery.data.results.map((inv) => {
                return (
                  <li key={inv.target_email} className="RegularList__li">
                    {inv.target_email}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>No outgoing invitation for this book.</div>
        )}
      </>
    );
  };

  const renderInvitationForm = () => {
    return (
      <>
        <div className="HSpace2"></div>
        <div className="Heading3">✉️ Invite more people</div>
        <SendInvitationForm />
      </>
    );
  };

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
                  {user.nickname ? <span>({user.nickname})</span> : ""}{" "}
                  {getAuthUserQuery.data?.id ===
                  getSingleBookQuery.data?.owner_id ? (
                    <button type="button" className="ButtonLink">
                      remove
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>No collaborators for this book</div>
      )}

      {getAuthUserQuery.data?.id === getSingleBookQuery.data?.owner_id
        ? renderInvitationSection()
        : null}
      {getAuthUserQuery.data?.id === getSingleBookQuery.data?.owner_id
        ? renderInvitationForm()
        : null}
    </>
  );
};

export default CollaboratorsPage;
