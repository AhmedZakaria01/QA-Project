//?Documentation
/**
 * Axios API service module for communicating with the RouteMisr E-commerce backend.
 * This component sets up a pre-configured Axios instance with a base URL and default headers,
 * and provides reusable functions for handling authentication (login, register)
 */

import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7209/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
// Login Method
export const loginUser = (credentials) =>
  api.post("Authenticate/login", credentials);

// Register Method
export const registerUser = (data) => api.post("/Authenticate/signup", data);
