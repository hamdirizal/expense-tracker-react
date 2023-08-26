import { useLoginUserMutation } from "../services/supabase";
import { AppDispatch } from "../store";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [loginUser, loginUserState] = useLoginUserMutation();

  const onFormSubmitted = (data: any) => {
    loginUser({ email: data.email, password: data.password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onFormSubmitted(data))}>
        <h1>Please login</h1>
        <div>
          <input
            type="text"
            placeholder="Email"
            required
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <input
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
    </div>
  );
};

export default LoginPage;
