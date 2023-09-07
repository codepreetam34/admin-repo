import axios from "axios";
// import { LOGIN } from "Routes/Routes";
import { setItem } from "./CommonService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;