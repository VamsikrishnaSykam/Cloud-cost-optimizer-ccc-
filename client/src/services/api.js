import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const optimizeCosts = (payload) => api.post("/optimize", payload);
