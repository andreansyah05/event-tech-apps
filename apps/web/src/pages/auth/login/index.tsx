import { LoginAuth } from "@/models/models";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthHandler } from "@/utils/authValidation";
import Button from "@/components/Button";
import Link from "next/link";
import { useAuth } from "@/utils/userContext";
import Cookies from "js-cookie";
import { redirectIfLogin } from "@/utils/redirectIfLogin";

function LoginPage() {
  // Check if the user already login or not
  redirectIfLogin();

  const router = useRouter();
  const { userLogin } = useAuth();

  const authHandler = new AuthHandler();
  // Disable Button
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false); // Track data loading state

  // LOGIN STATE
  const [formData, setFormData] = useState<LoginAuth>({
    email: "",
    password: "",
  });

  //   Handle change email
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      email: e.target.value,
      password: formData.password,
    });
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      email: formData.email,
      password: e.target.value,
    });
  };

  //   Handle Submit Button
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await authHandler.handleSubmitData(formData);
      console.log("Respone Handle Submit : ", response);
      if (response?.status === 200) {
        console.log("status === 200");
        userLogin(response.data.user);
        router.push("/");
      }
    } catch (error) {
      console.log("Something went wrong :", error);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(authHandler.handleLoginValidation(formData));
  }, [formData.email, formData.password]);

  return (
    <>
      <div className="p-4 md:flex md:h-screen md:justify-center md:items-center ">
        <div className="max-w-screen-sm mx-auto  p-5 border border-zinc-200 rounded bg-white md:p-10 ">
          <h1 className="font-bold text-2xl mb-9 md:text-3xl">
            LOGIN TO YOUR ACCOUNT
          </h1>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-6">
              <label className="block mb-2  font-medium text-gray-900 ">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-zinc-100 hover:bg-zinc-200 transition-all	 text-gray-900 text-sm rounded-sm  block w-full p-3 "
                placeholder="Ex : youremail@example.com"
                value={formData.email}
                onChange={handleChangeEmail}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-900 ">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-zinc-100 hover:bg-zinc-200 transition-all	 text-gray-900 text-sm rounded-sm  block w-full p-3 "
                placeholder="Min 8 characters"
                value={formData.password}
                onChange={handleChangePassword}
                required
              />
            </div>
            <Button
              isLoading={isLoading}
              isButton={true}
              width="w-fit"
              type="primary"
              text="Login"
              isButtonDisable={isButtonDisabled}
            />
          </form>

          <p className="text-gray-900">
            Don’t have an account?{" "}
            <Link
              className="underline text-indigo-600 font-bold hover:text-indigo-800"
              href={"/auth/register"}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
