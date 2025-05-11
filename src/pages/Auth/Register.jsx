import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();

  const { user, status, error } = useSelector((state) => state.authReducer);
  useEffect(() => {
    console.log(error?.message);
  }, [error]);

  return (
    <section className="bg-purple-600 p-4 text-white">
      <button
        type="button"
        onClick={() =>
          dispatch(
            register({
              name: "ahmed2211122",
              email: `ahmed2221122@example.com`,
              password: "P@ssw0rd",
              rePassword: "P@ssw0rd",
              phone: "01010700701",
            })
          )
        }
        className="bg-white text-black px-4 py-2 rounded"
      >
        Register
      </button>
    </section>
  );
}

export default Register;
