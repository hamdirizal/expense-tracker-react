import { Helmet } from "react-helmet";
import { Navigate, Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { AppTitle } from "../constants";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";

const MemberAreaSkeleton = () => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const renderContentMarkup = () => {
    if (getAuthUserQuery.isLoading) {
      return <LoadingSpinner />;
    } else if (getAuthUserQuery.isError) {
      return <Navigate to={AppPaths.LOGIN} />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <div className="MemberAreaSkeleton">
      <div>
        <Helmet>
          <title>Dashboard | {AppTitle}</title>
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
