import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, //Important: allows cookies to be sent with requests
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  //  Request interceptor (token is no longer needed)
  axiosSecure.interceptors.request.use(
    function (config) {
      // No need to manually attach the token
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response interceptor with SweetAlert + delayed logout
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized Access",
          text: "You don't have permission to access this content.",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Wait 5 seconds, then log out and redirect
        setTimeout(async () => {
          await axios.post("http://localhost:4000/api/auth/logout");
          navigate("/signIn");
        }, 5000);
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
