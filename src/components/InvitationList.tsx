import useRejectInvitationMutation from "../services/useRejectInvitationMutation";
import { Invitation } from "../types";

interface InvitationListProps {
  invitations: Invitation[];
}

const InvitationList = ({ invitations }: InvitationListProps) => {
  const rejectInvitationMutation = useRejectInvitationMutation();

  return (
    <div data-testid="InvitationList" className="RegularList">
      <ul className="RegularList__ul">
        {invitations.map((inv: Invitation) => {
          return (
            <li key={inv.book_uid} className="RegularList__li">
              <div>
                {inv.book_title} ({inv.owner_nickname || inv.owner_email})
              </div>
              <div>
                <button className="ButtonLink">accept</button>
                <span className="CharSpace1"></span>
                <button type="button" onClick={()=>{
                  rejectInvitationMutation.mutate(inv.book_uid);
                }} className="ButtonLinkDanger">reject</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InvitationList;
