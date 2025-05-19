"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 w-full">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-5xl font-semibold text-center">Welcome back</h1>
        <p className="text-center text-xl text-muted-foreground">
          Please enter your details.
        </p>
      </div>
      <div className="flex flex-col items-center w-1/2 justify-center gap-10  p-20 bg-white rounded-lg shadow-md dark:bg-secondary-dark ">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-semibold text-center  text-black">
            Log in
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
              className="w-full p-2 border border-primary-border rounded-md bg-white"
            />
          </div>
          <div className="relative flex flex-col items-start justify-start w-full gap-1">
            <label htmlFor="Password" className="text-sm  text-black">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border border-primary-border rounded-md bg-white"
            />
            {/* Eye icon */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 bg-gray-200 rounded-2xl p-1"
            >
              {showPassword ? (
                <EyeSlashIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
            <div className="flex items-center justify-end w-full mt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember_me" className="border-primary-border" />
                <label
                  htmlFor="remember_me"
                  className="text-xs text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-xs text-blue-500 italic hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-2 text-white rounded-md bg-primary-button hover:bg-hover-button transition duration-200"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
