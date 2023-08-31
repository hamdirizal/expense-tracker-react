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
    <div
      data-testid="LoginBox"
      className="w-[90vw] max-w-[380px] bg-grey-bg-2 rounded-lg"
    >
      <div className="relative">
        <form
          onSubmit={handleSubmit((data) => onFormSubmitted(data))}
          className="p-6"
        >
          <div className="mb-4">
            <input
              className="myapp-input-text"
              type="text"
              placeholder="Email"
              {...register("email", { required: false })}
            />
          </div>
          <div className="mb-4">
            <input
              className="myapp-input-text"
              type="text"
              placeholder="Password"
              {...register("password", { required: false })}
            />
          </div>
          {loginUserMutation.isError ? (
            <ErrorDiv error={loginUserMutation.error.message} />
          ) : null}
          <div className="h-10 relative flex justify-center items-center mt-4">
            {loginUserMutation.isLoading ? (
              <LoadingSpinner isOverlayed={false} />
            ) : (
              <Button
                size="regular"
                isFullWidth={true}
                onClick={() => {}}
                variant="primary"
                type="submit"
                label="Login"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginBox;
