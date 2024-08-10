import axios from "axios";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
//   baseURL: "https://gym-server-pi.vercel.app",
  baseURL: "https://easy-cash-server.vercel.app",
});
const useAxiosSecure = () => {

  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (err) => {
      const status = err.response.status;
      if (status === 403 || status === 401) {
        navigate("/");
       
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;