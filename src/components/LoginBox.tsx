import { useForm } from "react-hook-form";
import useLoginUserMutation from "../services/useLoginUserMutation";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";
import ErrorDiv from "./ErrorDiv";
import VarDump from "./VarDump";

const LoginBox = () => {
  const loginUserMutation = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    loginUserMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div data-testid="LoginBox" className="LoginBox">
      <h1 className="LoginBox__title">eTrackr</h1>
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
                <LoadingSpinner isOverlayed={false} />
              </div>
            ) : (
              <button className="ButtonPrimary" type="submit">
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginBox;
