import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";

const MemberAreaSkeleton = ({ content }: { content: JSX.Element }) => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const renderContentMarkup = () => {
    if (getAuthUserQuery.isLoading) {
      return <LoadingSpinner />;
    } else if (getAuthUserQuery.isError) {
      return <Navigate to={AppPaths.LOGIN} />;
    } else {
      return content;
    }
  };

  return (
    <div className="MemberAreaSkeleton">
      <div>
        <Helmet>
          <title>
            {Texts.DASHBOARD} | {Texts.APP_TITLE}
          </title>
        </Helmet>
        <AppHeader />
        <div className="ContentArea">
          {renderContentMarkup()}
          <div className="CopyrightNotes">{Texts.COPYRIGHT_NOTES}</div>
        </div>
      </div>
    </div>
  );
};

export default MemberAreaSkeleton;
