import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AppPaths, AppTitle } from "../constants";
import LoginBox from "../components/LoginBox";
import Heading1 from "../components/Heading1";

const LoginPage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const renderFinalMarkup = () => {
    return (
      <div
        data-testid="LoginPage"
        className="LoginPage"
      >
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
    return <Navigate to={AppPaths.BOOK_WELCOME} />;
  } else {
    return renderFinalMarkup();
  }
};

export default LoginPage;
