import { Helmet } from "react-helmet";
import { Navigate, Outlet } from "react-router-dom";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import AppHeader from "../components/AppHeader";
import { AppPaths, AppTitle, Texts } from "../constants";

const MemberAreaSkeleton = () => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const renderPageMarkup = () => {
    return (
      <div className="MemberAreaSkeleton">
        <div>
          <Helmet>
            <title>Dashboard | {AppTitle}</title>
          </Helmet>
          <AppHeader />
          <div className="ContentArea">
            <Outlet />
            <div className="CopyrightNotes">{Texts.COPYRIGHT_NOTES}</div>
          </div>
        </div>
      </div>
    );
  };

  if (getAuthUserQuery.isLoading) {
    return null;
  } else if (!getAuthUserQuery?.data?.id) {
    return <Navigate to={AppPaths.LOGIN} />;
  } else {
    return renderPageMarkup();
  }
};

export default MemberAreaSkeleton;
