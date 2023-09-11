import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

import logo from "../assets/monee-logo.png";
import ErrorDiv from "../components/ErrorDiv";
import LoadingSpinner from "../components/LoadingSpinner";
import { AppPaths } from "../constants/app-paths";
import { Texts } from "../constants/texts";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useRegisterMutation from "../services/useRegisterMutation";

const RegisterPage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const registerMutation = useRegisterMutation();

  const { register, handleSubmit } = useForm();

  const onFormSubmitted = (data: any) => {
    registerMutation.mutate({
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      nickname: data.nickname,
    });
  };

  const renderSuccessMessage = () => {
    return <div>
      <h2 className="Heading3">Registration success!</h2>
      <p>Please check your email for a confirmation link.</p>
      <p>
        <Link to={AppPaths.LOGIN}>Back to the login page</Link>
      </p>
    </div>
  }

  const renderRegisterForm = () => {
    return (
      <div className="relative">
        <h2 className="Heading3">{Texts.REGISTER}</h2>

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
          <div className="FormRow">
            <input
              className="InputText"
              type="text"
              maxLength={20}
              placeholder="Nickname (can be changed later)"
              {...register("nickname", { required: false })}
            />
          </div>
          <div className="FormRow">
            <input
              className="InputText"
              type="text"
              placeholder="Password"
              {...register("password", { required: false })}
            />
          </div>
          <div className="FormRow">
            <input
              className="InputText"
              type="text"
              placeholder="Confirm password"
              {...register("confirm_password", { required: false })}
            />
          </div>

          {registerMutation.isError ? (
            <ErrorDiv error={registerMutation.error.message} />
          ) : null}
          <div className="FormRow">
            {registerMutation.isLoading ? (
              <div className="AuthBox__spinner">
                <LoadingSpinner />
              </div>
            ) : (
              <button className="ButtonImportant" type="submit">
                {Texts.REGISTER}
              </button>
            )}
          </div>
        </form>
        <div className="HSpace2"></div>
        <div>
          <Link to={AppPaths.LOGIN}>{Texts.ALREADY_HAVE_AN_ACCOUNT}</Link>
        </div>
      </div>
    );
  };

  const renderFinalMarkup = () => {
    return (
      <>
        <Helmet>
          <title>
            {Texts.PAGETITLE_REGISTER} | {Texts.APP_TITLE}
          </title>
        </Helmet>
        <div className="AuthBox">
          <h1 className="AuthBox__logo">
            <img src={logo} alt="Monee" />
          </h1>          
          {registerMutation.isSuccess ? renderSuccessMessage() : renderRegisterForm()}
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

export default RegisterPage;
