import { useForm } from "react-hook-form";

import logo from "../assets/monee-logo.png";
import useLoginUserMutation from "../services/useLoginUserMutation";
import ErrorDiv from "./ErrorDiv";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

const LoginBox = () => {
  const loginUserMutation = useLoginUserMutation();

  const { register, handleSubmit } = useForm();

  const onFormSubmitted = (data: any) => {
    loginUserMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div data-testid="LoginBox" className="LoginBox">
      <h1 className="LoginBox__logo">
        <img src={logo} alt="Monee" />
      </h1>
      <div className="LoginBox__subtitle">Track your expenses</div>
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
              <div className="LoginBox__spinner">
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
        <div><Link to="">Forgot password?</Link></div>
        <div className="HSpace1"></div>
        <div><Link to="">Create account</Link></div>
      </div>
    </div>
  );
};

export default LoginBox;
