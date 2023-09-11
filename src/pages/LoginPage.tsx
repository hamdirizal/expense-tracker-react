import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

import logo from "../assets/monee-logo.png";
import ErrorDiv from "../components/ErrorDiv";
import LoadingSpinner from "../components/LoadingSpinner";
import { AppPaths, AppTitle } from "../constants";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useLoginUserMutation from "../services/useLoginUserMutation";

const LoginPage = () => {
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
          <title>Login | {AppTitle}</title>
        </Helmet>
        <div className="AuthBox">
          <h1 className="AuthBox__logo">
            <img src={logo} alt="Monee" />
          </h1>

          <h2 className="Heading3">Login</h2>
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
              <div className="FormRow">
                <input
                  className="InputText"
                  type="text"
                  placeholder="Password"
                  {...register("password", { required: false })}
                />
              </div>
              {loginUserMutation.isError ? (
                <ErrorDiv error={loginUserMutation.error.message} />
              ) : null}
              <div className="FormRow">
                {loginUserMutation.isLoading ? (
                  <div className="AuthBox__spinner">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <button className="ButtonRegular" type="submit">
                    Login
                  </button>
                )}
              </div>
            </form>
            <div className="HSpace2"></div>
            <div>
              <Link to="">Forgot password?</Link>
            </div>
            <div className="HSpace1"></div>
            <div>
              <Link to="">Create account</Link>
            </div>
          </div>
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

export default LoginPage;
