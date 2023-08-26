import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import usePage from "../hooks/usePage";
import { AppDispatch } from "../store";
import { useForm } from "react-hook-form";
import { Page } from "../types";
import useLoginUserMutation from "../services/useLoginUserMutation";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const loginUserMutation = useLoginUserMutation();
  const { switchPage } = usePage();

  const onFormSubmitted = (data: any) => {
    loginUserMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit((data) => onFormSubmitted(data))}>
        <h1>Please login</h1>
        <div>
          <input
            className="border"
            type="text"
            placeholder="Email"
            required
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <input
            className="border"
            type="text"
            placeholder="Password"
            required
            {...register("password", { required: true })}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {loginUserMutation.isLoading && <LoadingSpinner isOverlayed={true} />}
    </div>
  );
};

export default LoginPage;
