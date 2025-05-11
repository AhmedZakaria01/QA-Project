import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (credentials) => {
  return api.post("/auth/signin", credentials);
};
export const registerUser = (data) => api.post("/Authenticate/register", data);

// Example: add more services later
export const fetchUserData = () => api.get("/User/profile");
export const fetchProducts = () => api.get("/Products");

//
