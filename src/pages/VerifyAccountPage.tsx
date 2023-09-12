import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, Navigate, useParams } from "react-router-dom";

import logo from "../assets/monee-logo.png";
import ErrorDiv from "../components/ErrorDiv";
import LoadingSpinner from "../components/LoadingSpinner";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useVerifyAccountMutation from "../services/useVerifyAccountMutation";

const VerifyAccountPage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const verifyAccountMutation = useVerifyAccountMutation();
  const { token } = useParams();

  useEffect(() => {
    verifyAccountMutation.mutate({ token: token || "" });
  }, []);

  const renderFinalMarkup = () => {
    return (
      <>
        <Helmet>
          <title>Account verification | {Texts.APP_TITLE}</title>
        </Helmet>
        <div className="AuthBox">
          <h1 className="AuthBox__logo">
            <img src={logo} alt="Monee" />
          </h1>

          {verifyAccountMutation.isLoading && (
            <>
              <h2 className="Heading3">
                Verifiying your account. Please wait.
              </h2>
              <LoadingSpinner />
            </>
          )}

          {verifyAccountMutation.isError && (
            <div>
              <p>Verification failed.</p>
              <ErrorDiv error={verifyAccountMutation.error.message} />
              <p>
                <Link to={AppPaths.LOGIN}>Back to the login page.</Link>
              </p>
            </div>
          )}

          {verifyAccountMutation.isSuccess && (
            <p>
              Verification success. <br />
              <p>
                <Link to={AppPaths.LOGIN}>Back to the login page.</Link>
              </p>
            </p>
          )}
        </div>
      </>
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

export default VerifyAccountPage;
