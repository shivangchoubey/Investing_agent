import axios from "axios";

const api = axios.create({
  baseURL: "https://investing-agent-82tj.onrender.com/",
});

export default api;