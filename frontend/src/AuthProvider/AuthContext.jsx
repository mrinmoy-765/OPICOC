import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const AxiosSecure = useAxiosSecure();
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/auth/is-authenticated", {
        skipAuthError: true,
      });

      return res.data;
      // console.log("UserInfo", res.data);
    },

    retry: false,
  });

  const login = async () => {
    await refetch(); // re-check auth immediately
  };

  //logout
  const logout = async () => {
    try {
      const res = await AxiosPublic.post("/auth/logout");

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);

      // Clear cached user data
      queryClient.clear();
      localStorage.removeItem("cart");

      // Redirect AFTER toast
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: data?.success || false,
        user: data?.user || null,
        isLoading,
        login,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
