import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/api",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export const register = (formValues) => API.post("/auth/signup", formValues);
export const login = (formValues) => API.post("/auth/signin", formValues);
