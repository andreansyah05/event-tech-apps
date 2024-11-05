import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export function redirectIfLogin() {
  const router = useRouter();
  useEffect(() => {
    // Check if user is already logged in
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");
    if (accessToken || refreshToken) {
      router.push("/"); // Redirect to home page if already logged in
    }
  }, []);
  return null;
}
