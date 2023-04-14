import React, { useState } from "react";
import Auth from "./Auth";
import { useRegister } from "../hooks/Users/Register";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let count = 0;

const Register = () => {
  // const [register, setRegister] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confPassword: "",
  // });

  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  console.log(errors);

  const navigate = useNavigate();
  const { isError, error, mutate, isLoading } = useRegister({ onSuccess: () => navigate("/login") });

  // const handleOnChange = (e) => {
  //   setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleRegister = (data) => {
    // e.preventDefault();
    // mutate(register);
    mutate(data);
    console.log("Form Submit", data);
  };

  count++;
  return (
    <Auth>
      <h1 className=" font-bold text-3xl text-slate-300">Register({count / 2})</h1>
      <form className=" items-start flex flex-col w-full gap-y-4" onSubmit={handleSubmit(handleRegister)}>
        <div className=" w-full flex flex-col gap-y-1">
          <input
            type="text"
            className=" w-full h-10 bg-transparent border-b border-slate-500 outline-none focus:border-slate-300 transition-all ease-in-out duration-150 flex items-center px-1 text-[17px]"
            placeholder="username"
            // onChange={handleOnChange}
            // name="username"
            {...register("username", {
              minLength: 6,
              maxLength: { value: 30, message: "maxlength exeeded" },
              required: {
                value: true,
                massage: "Username is required",
              },
            })}
          />
          {errors?.username && <p className=" text-red-600">*{errors.username?.message}</p>}
        </div>
        <div className=" w-full flex flex-col gap-y-1">
          <input
            type="email"
            className=" w-full h-10 bg-transparent border-b border-slate-500 outline-none focus:border-slate-300 transition-all ease-in-out duration-150 flex items-center px-1 text-[17px]"
            placeholder="email"
            // onChange={handleOnChange}
            // name="email"
            {...register("email", {
              required: {
                value: true,
                massage: "Email is required",
              },
            })}
          />
          {errors?.email && <p className=" text-red-600">*{errors.email?.message}</p>}
        </div>
        <div className=" w-full flex flex-col gap-y-1">
          <input
            type="password"
            className=" w-full h-10 bg-transparent border-b border-slate-500 outline-none focus:border-slate-300 transition-all ease-in-out duration-150 flex items-center px-1 text-[17px]"
            placeholder="password"
            // onChange={handleOnChange}
            // name="password"
            {...register("password", {
              minLength: 6,
              required: {
                value: true,
                massage: "Password is required",
              },
            })}
          />
          {errors?.password && <p className=" text-red-600">*{errors.password?.message}</p>}
        </div>
        <div className=" w-full flex flex-col gap-y-1">
          <input
            type="password"
            className=" w-full h-10 bg-transparent border-b border-slate-500 outline-none focus:border-slate-300 transition-all ease-in-out duration-150 flex items-center px-1 text-[17px]"
            placeholder="confirm password"
            // onChange={handleOnChange}
            // name="confPassword"
            {...register("confPassword", {
              minLength: 6,
              required: {
                value: true,
                massage: "Confirm Password is required",
              },
            })}
          />
          {errors?.confPassword && <p className=" text-red-600">*{errors.confPassword?.message}</p>}
        </div>
        <button
          onClick={handleSubmit(handleRegister)}
          className="bg-gradient-to-tr from-[#fa7e1e] to-[#d62976] rounded-md w-32 h-9 text-base font-bold mt-3">
          {isLoading ? "loading" : "Register"}
        </button>
      </form>
      <DevTool control={control} />
    </Auth>
  );
};

export default Register;
