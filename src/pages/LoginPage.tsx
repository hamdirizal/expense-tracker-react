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
        className="min-h-screen flex justify-center items-start pt-14"
      >
        <Helmet>
          <title>Login | {AppTitle}</title>
        </Helmet>
        <div>
          <div className="mb-1">
            <Heading1 title="My App" />
          </div>
          <div className="mb-6">Track your expenses</div>
          <LoginBox />
        </div>
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
