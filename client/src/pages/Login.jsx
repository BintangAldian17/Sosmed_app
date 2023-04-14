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
  const { mutate, isError } = useLogin({
    onSuccess: (response) => {
      setCurrentUser(response.data);
      if (currentUser) {
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
        <button
          className="bg-gradient-to-tr from-[#fa7e1e]  to-[#d62976] rounded-md w-32 h-9 text-base font-bold"
          onClick={handleSubmit(handleLogin)}>
          Login
        </button>
        <DevTool control={control} />
      </form>
    </Auth>
  );
};

export default Login;
