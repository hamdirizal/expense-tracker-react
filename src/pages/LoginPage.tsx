import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";

import LoginBox from "../components/LoginBox";
import { AppPaths, AppTitle } from "../constants";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";

const LoginPage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const renderFinalMarkup = () => {
    return (
      <div>
        <Helmet>
          <title>Login | {AppTitle}</title>
        </Helmet>
        <LoginBox />
      </div>
    );
  };

  if (getAuthUserQuery.isLoading) {
    return null;
  } else if (getAuthUserQuery.isSuccess && getAuthUserQuery?.data?.id) {
    return <Navigate to={AppPaths.DASHBOARD} />;
  } else {
    return renderFinalMarkup();
  }
};

export default LoginPage;
