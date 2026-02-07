import axios from "axios";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "https://backend-omega-one-37.vercel.app/api",
  //baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const skip = error.config?.skipAuthError;

      if ((status === 401 || status === 403) && !skip) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Session expired. Please login again.",
          timer: 3000,
          showConfirmButton: false,
        });
      }

      return Promise.reject(error);
    },
  );

  return axiosSecure;
};

export default useAxiosSecure;
