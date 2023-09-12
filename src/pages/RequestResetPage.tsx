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
import useRequestResetMutation from "../services/useRequestResetMutation";

const RequestResetPage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const requestResetMutation = useRequestResetMutation();

  const { register, handleSubmit } = useForm();

  const onFormSubmitted = (data: any) => {
    requestResetMutation.mutate({
      email: data.email,
    });
  };

  const renderForm = () => {
    return (
      <>
        <h2 className="Heading3">Reset password</h2>
        <div className="relative">
          <form
            onSubmit={handleSubmit((data) => onFormSubmitted(data))}
            className="p-6"
          >
            <div className="FormRow">
              <input
                className="InputText"
                type="text"
                placeholder="Email"
                {...register("email", { required: false })}
              />
            </div>
            {requestResetMutation.isError ? (
              <ErrorDiv error={requestResetMutation.error.message} />
            ) : null}
            <div className="FormRow">
              {requestResetMutation.isLoading ? (
                <div className="AuthBox__spinner">
                  <LoadingSpinner />
                </div>
              ) : (
                <button className="ButtonImportant" type="submit">
                  Get reset link
                </button>
              )}
            </div>
          </form>
          <div className="HSpace2"></div>
          <div>
            <Link to={AppPaths.LOGIN}>Back to the login page</Link>
          </div>
        </div>
      </>
    );
  };

  const renderFinalMarkup = () => {
    return (
      <>
        <Helmet>
          <title>Request password reset | {Texts.APP_TITLE}</title>
        </Helmet>
        <div className="AuthBox">
          <h1 className="AuthBox__logo">
            <img src={logo} alt="Monee" />
          </h1>

          {requestResetMutation.isSuccess ? <div>
            <h2 className="Heading3">Success</h2>
            <p>A reset link has been sent to your email. </p>
            <p><Link to={AppPaths.LOGIN}>Back to the login page</Link></p>
          </div> : renderForm()}
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

export default RequestResetPage;
