import { useForm } from "react-hook-form";
import useLoginUserMutation from "../services/useLoginUserMutation";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";
import ErrorDiv from "./ErrorDiv";

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
              className="bg-grey-input-bg border text-white-text border-grey-input-border rounded w-full px-4 py-2"
              type="text"
              placeholder="Email"
              required
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-grey-input-bg border text-white-text border-grey-input-border rounded w-full px-4 py-2"
              type="text"
              placeholder="Password"
              required
              {...register("password", { required: true })}
            />
          </div>
          {!loginUserMutation.data && loginUserMutation.isSuccess ? (
            <div className="mb-2">
              <ErrorDiv error="Login failed" />
            </div>
          ) : null}
          <div className="h-10 relative flex justify-center items-center">
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
