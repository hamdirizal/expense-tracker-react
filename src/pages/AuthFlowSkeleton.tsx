import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

import { Texts } from "../constants/texts";

const AuthFlowSkeleton = () => {
  return (
    <div className="MemberAreaSkeleton">
      <div>
        <Helmet>
          <title>Auth | {Texts.APP_TITLE}</title>
        </Helmet>
        <div className="ContentArea">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthFlowSkeleton;
