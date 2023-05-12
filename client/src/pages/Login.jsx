import { useLogin } from "../hooks/Users/Login";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { AuthContext } from "../context-provider/AuthContextProvider";
import { useContext, useState } from "react";

const Login = () => {
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const navigate = useNavigate();
  const { mutate, isError, isLoading } = useLogin({
    onSuccess: (response) => {
      setCurrentUser(response?.data);
      if (response?.data) {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      setMsg(error.response.data.msg);
    },
  });

  const handleLogin = (data) => {
    mutate(data);
  };

  return (
    <Auth>
      {isError ? <h1 className=" text-red-600">{msg}</h1> : null}

      <h1 className=" font-bold text-3xl text-slate-300">Login</h1>
      <form className=" items-start flex flex-col w-full gap-y-8" onSubmit={handleSubmit(handleLogin)}>
        <div className=" w-full flex flex-col gap-y-2">
          <input
            type="text"
            className=" w-full h-10 bg-transparent border-b border-slate-500 outline-none focus:border-slate-300 transition-all ease-in-out duration-150 flex items-center px-1 text-[17px]"
            placeholder="username"
            {...register("username", {
              required: true,
            })}
          />

          {errors.username && errors.username.type === "required" && (
            <span className=" text-red-600">*This is required</span>
          )}
        </div>
        <div className=" flex flex-col w-full gap-y-2">
          <input
            type="password"
            className=" w-full h-10 bg-transparent border-b border-slate-500 outline-none focus:border-slate-300 transition-all ease-in-out duration-150 flex items-center px-1 text-[17px]"
            placeholder="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <span className=" text-red-600">*This is required</span>
          )}
        </div>
        {isLoading === true ? (
          <button
            className="bg-gradient-to-tr from-[#fa7e1e]  to-[#d62976] rounded-md w-32 h-9 text-base font-bold cursor-not-allowed"
            onClick={handleSubmit(handleLogin)}
            disabled>
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-transparent  fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </button>
        ) : (
          <button
            className="bg-gradient-to-tr from-[#fa7e1e]  to-[#d62976] rounded-md w-32 h-9 text-base font-bold"
            onClick={handleSubmit(handleLogin)}>
            Login
          </button>
        )}
        <DevTool control={control} />
      </form>
    </Auth>
  );
};

export default Login;
