import { useContext, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useForm } from "react-hook-form";
import { Page } from "../types";
import useLoginUserMutation from "../services/useLoginUserMutation";
import PageTitle from "../components/PageTitle";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { PageContext } from "../App";
import VarDump from "../components/VarDump";

const LoginPage = () => {
  const getAuthUserState = useGetAuthUserQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const loginUserMutation = useLoginUserMutation();
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const onFormSubmitted = (data: any) => {
    loginUserMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (getAuthUserState.isSuccess) {
      setCurrentPage(Page.DASHBOARD);
    }
  }, [getAuthUserState]);

  return (
    <div>
      <PageTitle title="Login" />
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
    </div>
  );
};

export default LoginPage;
