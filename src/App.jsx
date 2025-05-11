import { useDispatch } from "react-redux";
import { login } from "./features/auth/authSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Auth/Login";
import PageNotFound from "./pages/Auth/PageNotFound";
import Layout from "./Layout";
import Register from "./pages/Auth/Register";

export default function App() {
  const dispatch = useDispatch();

  return (
    <>
 
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
