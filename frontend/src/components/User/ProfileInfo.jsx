import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ProfileInfo = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const AxiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      country: user?.country || "",
      city: user?.city || "",
      zipCode: user?.zipCode || "",
    },
  });

  //  When parent user changes → update form
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        country: user.country || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
      });
    }
  }, [user, reset]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);

      const res = await AxiosSecure.put("/user/update-profile", {
        FirstName: data.firstName,
        LastName: data.lastName,
        phone: data.phone,
        address: data.address,
        country: data.country,
        city: data.city,
        zipCode: data.zipCode,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      // Update form with backend response
      reset({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        email: res.data.user.email,
        phone: res.data.user.phone || "",
        address: res.data.user.address || "",
        country: res.data.user.country || "",
        city: res.data.user.city || "",
        zipCode: res.data.user.zipCode || "",
      });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-bold text-3xl">Personal Details</h3>

      <p className="text-md text-gray-500 font-semibold mt-1 mb-7">
        Edit your personal information and address
      </p>

      <form onSubmit={handleSubmit(handleUpdate)} className="">
        {/* first & last name section */}
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="first-name"
              class="block text-sm/6 font-medium text-gray-900"
            >
              First name
            </label>
            <div class="mt-2">
              <input
                id="first-name"
                type="text"
                {...register("firstName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name must contain letters only",
                  },
                })}
                defaultValue={user.firstName}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
              />

              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="last-name"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Last name
            </label>
            <div class="mt-2">
              <input
                id="last-name"
                type="text"
                {...register("lastName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name must contain letters only",
                  },
                })}
                defaultValue={user.lastName}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* email phone */}
        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="email"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div class="mt-2">
              <input
                id="email"
                type="text"
                readOnly
                defaultValue={user.email}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="phone"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="Enter phone number"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900
               outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400
               focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
                {...register("phone", {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                  minLength: {
                    value: 7,
                    message: "Minimum 7 digits required",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum 15 digits allowed",
                  },
                })}
              />
            </div>

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* address country */}
        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="address"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Address
            </label>
            <div class="mt-2">
              <input
                id="address"
                type="text"
                name="address"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
                {...register("address")}
                defaultValue={user?.address}
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="country"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Country
            </label>
            <div class="mt-2">
              <input
                id="country"
                type="text"
                name="country"
                {...register("country", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Country Name must contain letters only",
                  },
                })}
                defaultValue={user?.country}
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
              />
              {errors.country && (
                <p className="text-red-500 text-xs">{errors.country.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* city zip code */}
        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="city" class="block text-sm/6 font-medium text-gray-900">
              City
            </label>
            <div class="mt-2">
              <input
                id="city"
                type="text"
                name="city"
                {...register("city", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "City Name must contain letters only",
                  },
                })}
                defaultValue={user?.city}
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="zip-code"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Zip Code
            </label>
            <div class="mt-2">
              <input
                id="zip-code"
                type="text"
                name="zip-code"
                {...register("zipCode")}
                defaultValue={user?.zipCode}
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-red-500 text-lg text-white hover:bg-red-600 font-semibold rounded-lg my-3.5"
        >
          {loading ? "Updating Profile" : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
