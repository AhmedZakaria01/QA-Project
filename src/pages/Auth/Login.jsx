import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/SubmitButton";

function Login() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.authReducer);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      login({
        email: "marwsafouad22@gmail.com",
        password: "Marwa@123",
      })
    );
  };

  console.log(watch("username")); // watch input value by passing the name of it
  return (
    <form
      className="bg-blue-950 text-white w-full max-w-md mx-auto mt-10 p-8 rounded-xl shadow-lg flex flex-col gap-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col w-full">
        <label htmlFor="email" className="mb-1 text-sm font-medium">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
          name="email"
          id="email"
          placeholder="Enter your Email"
          {...register("email")}
        />
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="password" className="mb-1 text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          className="p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
          name="password"
          id="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
        {errors.exampleRequired && (
          <span className="text-red-400 mt-1 text-sm">
            This field is required
          </span>
        )}
      </div>

      <div className="w-full ">
        <SubmitButton bgColor="indigo-500" textColor="white" />
      </div>
    </form>
  );
}

export default Login;
