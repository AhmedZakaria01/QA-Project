import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.authReducer);

  return (
    <section className="bg-red-600 p-4 text-white">
      <button
        type="button"
        onClick={() =>
          dispatch(
            login({
              email: "marwsafouad22@gmail.com",
              password: "Marwa@123",
            })
          )
        }
        className="bg-white text-red-600 px-4 py-2 rounded"
      >
        Login
      </button>
    </section>
  );
}

export default Login;
