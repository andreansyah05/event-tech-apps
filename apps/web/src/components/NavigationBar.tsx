import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/utils/userContext";
import { AuthHandler } from "@/utils/authValidation";
import { formatNumber } from "@/utils/formatter/formatNumber";
import UserMenu from "./UserMenu";

interface NavigationBarProps {
  isLogin: boolean;
  userRole: "admin" | "user";
  name?: string;
  point?: number;
}

function NavigationBar({ isLogin, point, name }: NavigationBarProps) {
  const { user, userLogin } = useAuth();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const authHandler = new AuthHandler();
  let formattedNumber: string = "0";
  if (point) {
    formattedNumber = formatNumber(point);
  }

  // Fetch data user based on access token
  async function handleFethingUserData(userToken: string): Promise<void> {
    try {
      const response = await authHandler.validateUserToken(userToken);
      console.log("New data user (data)", response);

      // Check if the response true
      response ? userLogin(response) : userLogin(null);
    } catch (error) {
      console.log("Error validating token after refresh", error);
    }
  }

  // Refersh user token
  async function refreshUserAcessToken(refreshToken: string): Promise<void> {
    try {
      const response = await authHandler.refreshUserAcessToken(refreshToken);

      // Check if the response true
      response ? userLogin(response) : userLogin(null);
    } catch (error) {
      console.log("Error refreshing token", error);
    }
  }

  // Can be improved to meet DRY concept
  useEffect(() => {
    const userToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    // Check if the data user already available
    if (!user) {
      // Check if the user already has a refresh token
      if (refreshToken) {
        // Check the availability of the access token
        userToken
          ? handleFethingUserData(userToken)
          : refreshUserAcessToken(refreshToken);
      } else {
        // Do nothing
      }
      // Do nothing
    }
  }, []);
  const loginState = (
    <div className="flex gap-5">
      <div className="p-2 bg-[#f8f7f7] rounded-md flex gap-2 items-center">
        <Image
          width={64}
          height={64}
          className="w-6 h-6"
          alt="coin"
          src="/icon/coin.svg"
        />
        <p className=" font-semibold">{formattedNumber}</p>
      </div>
      <button
        className="cursor-pointer p-2 bg-[#f8f7f7] rounded-md flex gap-2 items-center hover:bg-zinc-100"
        onClick={() => {
          setShowMenu(!showMenu);
          console.log("click");
        }}
      >
        <Image
          width={64}
          height={64}
          className="w-6 h-6"
          alt="coin"
          src="/icon/user.svg"
        />
        <p className="font-semibold">{name}</p>
        <Image
          width={64}
          height={64}
          className={`w-6 h-6 ease-in-out transition-transform duration-200 ${showMenu ? "rotate-180" : "rotate-0"}`}
          alt="coin"
          src="/icon/dropdown.svg"
        />
      </button>
    </div>
  );

  return (
    <>
      <header className="p-3 bg-transparent">
        <div className="max-w-screen-xl mx-auto w-full flex justify-between items-center">
          <Link href="/">
            <Image
              src="/mainLogo.png"
              width={668}
              height={164}
              //layout="responsive"
              alt="main-logo"
              className="w-36"
            />
          </Link>

          {isLogin ? (
            loginState
          ) : (
            <nav className="flex gap-3">
              <Button
                width="w-fit"
                href="http://localhost:3000/auth/login"
                isButton={false}
                isButtonDisable={false}
                type="primary-border"
                text="
          LOGIN"
              />
              <Button
                width="w-fit"
                isButton={false}
                href="http://localhost:3000/auth/register"
                isButtonDisable={false}
                type="primary"
                text="
          REGISTER"
              />
            </nav>
          )}
        </div>
      </header>
      <div className="max-w-screen-xl mx-auto relative h-1 px-4">
        {showMenu && <UserMenu />}
      </div>
    </>
  );
}

export default NavigationBar;
