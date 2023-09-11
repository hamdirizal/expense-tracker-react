import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

import logo from "../assets/monee-logo.png";
import ErrorDiv from "../components/ErrorDiv";
import LoadingSpinner from "../components/LoadingSpinner";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useLoginUserMutation from "../services/useLoginUserMutation";

const VerifyAccountPage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const loginUserMutation = useLoginUserMutation();

  const { register, handleSubmit } = useForm();

  const onFormSubmitted = (data: any) => {
    loginUserMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

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

          <h2 className="Heading3">Verifiying your account. Please wait.</h2>
          <LoadingSpinner />
          <p>
            Verification failed.
          </p>
          <div>
            <button type="button" className="ButtonRegular">Resend verification email</button>
          </div>
          <p>Verification success. <br /><Link to={AppPaths.LOGIN}>Login here</Link> to use the app.</p>
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
