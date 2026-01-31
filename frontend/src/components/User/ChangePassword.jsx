import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const AxiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    //console.log("Change password", passwords);
    // call change password API
    try {
      setLoading(true);
      const res = await AxiosSecure.put("/user/changePassword", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.confirmPassword,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-bold text-3xl mt-10">Change Password</h3>

      <p className="text-md text-gray-500 font-semibold mt-1 mb-7">
        We will email you a confirmation when changing your password, so please
        expect that email after submitting
      </p>

      <form onSubmit={handleSubmit}>
        {/* current password */}
        <div class="sm:col-span-4">
          <label for="current-password" class="block text-sm/6 font-medium">
            Current Password
          </label>
          <div class="mt-2">
            <input
              id="current-password"
              type="password"
              name="currentPassword"
              onChange={handleChange}
              class="block lg:w-3/5 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* New Password */}
        <div class="sm:col-span-4">
          <label for="new-password" class="block text-sm/6 font-medium">
            New Password
          </label>
          <div class="mt-2">
            <input
              id="new-password"
              type="password"
              name="newPassword"
              onChange={handleChange}
              class="block lg:w-3/5 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Confirm password */}
        <div class="sm:col-span-4">
          <label for="confirm-password" class="block text-sm/6 font-medium">
            Confirm Password
          </label>
          <div class="mt-2">
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              class="block lg:w-3/5 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-red-500 text-lg text-white hover:bg-red-600 font-semibold rounded-lg mt-5"
        >
          {loading ? "Updating Password" : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
