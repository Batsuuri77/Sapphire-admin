"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import DefaultButton from "@/components/buttons/DefaultButton";
import { ROUTES } from "@/utils/routes";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [adminData, setAdminData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      console.log("Admin created:", data);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 w-full">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-5xl font-semibold text-center">Hello there!</h1>
        <p className="text-center text-xl text-muted-foreground">
          Please enter your details.
        </p>
      </div>
      <div
        className="flex flex-col items-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2
 justify-center gap-8 px-20 py-10 bg-white rounded-lg shadow-md dark:bg-secondary-dark "
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-semibold text-center  text-black">
            Sign up
          </h1>
          <p className="text-center text-md text-muted-foreground">
            Scale your business with us!
          </p>
        </div>

        <form className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="flex flex-col items-start justify-start w-full gap-1">
            <label htmlFor="Email" className="text-sm   text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={adminData.email}
              onChange={(e) =>
                setAdminData({
                  ...adminData,
                  email: e.target.value,
                })
              }
              className="w-full p-2 border border-primary-border rounded-md bg-white"
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-1">
            <label htmlFor="Username" className="text-sm   text-black">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={adminData.userName}
              onChange={(e) =>
                setAdminData({
                  ...adminData,
                  userName: e.target.value,
                })
              }
              className="w-full p-2 border border-primary-border rounded-md bg-white"
            />
          </div>
          <div className="relative flex flex-col items-start justify-start w-full gap-1">
            <label htmlFor="password" className="text-sm  text-black">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={adminData.password}
              onChange={(e) =>
                setAdminData({
                  ...adminData,
                  password: e.target.value,
                })
              }
              className="w-full p-2 border border-primary-border rounded-md bg-white"
            />
            {/* Eye icon */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-500 bg-gray-200 rounded-2xl p-1"
            >
              {showPassword ? (
                <EyeSlashIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
          <div className="relative flex flex-col items-start justify-start w-full gap-1">
            <label htmlFor="confirmPassword" className="text-sm  text-black">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={adminData.confirmPassword}
              onChange={(e) =>
                setAdminData({
                  ...adminData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full p-2 border border-primary-border rounded-md bg-white"
            />
            {/* Eye icon */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-500 bg-gray-200 rounded-2xl p-1"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
          <div className="flex justify-between gap-2 w-full items-center text-sm text-muted-foreground">
            <span className="w-1/5 border-t border-primary-border"></span>
            <a
              href={ROUTES.LOGIN}
              className="text-sm text-blue-500 italic hover:underline"
            >
              Already have an account?
            </a>
            <span className="w-1/5 border-t border-primary-border"></span>
          </div>
          <DefaultButton
            type={"submit"}
            text={"Sign up"}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
