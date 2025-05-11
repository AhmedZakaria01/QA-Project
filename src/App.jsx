import { useDispatch } from "react-redux";
import { login } from "./features/auth/authSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  const dispatch = useDispatch();

  return (
    <>
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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {/* <Layout setNavWidth={setNavWidth} navWidth={navWidth} /> */}
              </ProtectedRoute>
            }
          />
           

            
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
