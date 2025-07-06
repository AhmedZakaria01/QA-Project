/**
 * This component sets up a pre-configured Axios instance with a base URL and default headers,
 * and provides reusable functions for handling Apis
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Login Method
export const loginUser = (credentials) =>
  api.post("Authenticate/login", credentials);

// Register Method
export const registerUser = (data) => api.post("/Authenticate/signup", data);
