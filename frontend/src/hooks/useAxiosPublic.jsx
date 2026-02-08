import axios from "axios";

const axiosPublic = axios.create({
  //baseURL: "https://backend-omega-one-37.vercel.app/api",
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
