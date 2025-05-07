import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7148",
});

export default api;
