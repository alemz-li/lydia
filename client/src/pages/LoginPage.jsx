import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/bites");
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
        {loginErrors.map((error, i) => (
          <div
            className="my-1 w-full rounded-md bg-red-500 p-2 text-white"
            key={i}
          >
            {error}
          </div>
        ))}
        <form
          className="w-full rounded bg-white px-6 py-8 text-black shadow-md"
          onSubmit={onSubmit}
        >
          <h1 className="mb-8 text-center text-3xl">Login</h1>
          <input
            type="text"
            {...register("email", { required: true })}
            className="border-grey-light mb-4 block w-full rounded border p-3"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="border-grey-light mb-4 block w-full rounded border p-3"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button
            type="submit"
            className="my-1 w-full rounded bg-blue-500 py-3 text-center text-white hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-zinc-600 dark:text-zinc-100">
          Don&apos;t have an account?
          <Link to="/register" className="mx-2 text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
