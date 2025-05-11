//?Documentation
/**
 * Axios API service module for communicating with the RouteMisr E-commerce backend.
 * This component sets up a pre-configured Axios instance with a base URL and default headers,
 * and provides reusable functions for handling authentication (login, register)
 */

import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (credentials) => api.post("/auth/signin", credentials);
export const registerUser = (data) => api.post("/auth/signup", data);

// Example: add more services later
// export const fetchUserData = () => api.get("/User/profile");
// export const fetchProducts = () => api.get("/Products");
