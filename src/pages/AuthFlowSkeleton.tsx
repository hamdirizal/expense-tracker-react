import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

import { Texts } from "../constants/texts";


const AuthFlowSkeleton = ({content}:{content: JSX.Element}) => {
  return (
    <div className="AuthFlowSkeleton">
      <div>
        <Helmet>
          <title>Auth | {Texts.APP_TITLE}</title>
        </Helmet>
        <div className="ContentArea">
          {content}
        </div>
      </div>
    </div>
  );
};

export default AuthFlowSkeleton;
