import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import { login } from "../authThunks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Popup from "../../../globalComponents/Popup";
import { useState } from "react";

function Login() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.authReducer);
  const [isOpen, setIsOpen] = useState(false);
  console.log(user);

  function open() {
    setIsOpen(true);
  }

  //    ?  Login Schema
  const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must include at least one special character"
      )
      .regex(/[0-9]/, "Must include at least one number"),
  });

  //   Use Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  //   ?  On Submit
  const onSubmit = (data) => {
    dispatch(login(data));
    open();
  };

  return (
    <section className="min-h-screen justify-center content-center bg-black">
      <form
        className=" bg-blue-800 text-white w-full max-w-md mx-auto mt-10 p-8 rounded-xl shadow-lg flex flex-col gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* User Name */}
        <div className="flex flex-col w-full my-3 pt-3">
          <label htmlFor="username" className="mb-1 text-sm font-medium">
            User Name
          </label>
          <input
            className="p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            name="username"
            id="username"
            placeholder="Enter your userName"
            {...register("username")}
          />
          {/* Display Username Error */}
          {errors.username && (
            <span className="text-red-400 mt-1 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col w-full my-3">
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
          {/* Display Password Error */}
          {errors.password && (
            <span className="text-red-400 mt-1 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="w-full my-3 pb-3">
          <SubmitButton bgColor="indigo-500" textColor="white" />
        </div>

        {/* <Popup isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        
      </form>
    </section>
  );
}

export default Login;
