import { useNavigate } from "react-router";

import { AppPaths } from "../constants/app-paths";
import { Invitation } from "../types";

interface InvitationListProps {
  invitations: Invitation[];
}

const InvitationList = ({ invitations }: InvitationListProps) => {
  const navigate = useNavigate();
  return (
    <div data-testid="InvitationList" className="RegularList">
      <ul className="RegularList__ul">
        {invitations.map((inv: Invitation) => {
          return (
            <li key={inv.book_id} className="RegularList__li">
              <div>
                {inv.book_title} ({inv.owner_nickname || inv.owner_email})
              </div>
              <div>
                <button className="ButtonLink">accept</button>
                <span className="CharSpace1"></span>
                <button className="ButtonLinkDanger">reject</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InvitationList;
