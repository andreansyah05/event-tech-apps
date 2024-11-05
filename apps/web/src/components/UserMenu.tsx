import Link from "next/link";
import { useAuth } from "@/utils/userContext";
import Cookies from "js-cookie";

function UserMenu() {
  const { userLogout } = useAuth();

  // Add logout functionality here using userLogout hook
  function handleLogout() {
    const hideMenu = true;
    userLogout();
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.href = "/"; // Replace '/' with your desired URL
  }

  return (
    <div className="bg-white p-4 absolute right-0 top-0 min-w-60 shadow-lg rounded-md">
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            href="/"
            className="text-left p-2 text-gray-950 inline-block rounded-md w-full hover:bg-gray-100 "
          >
            Edit Profile
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="rounded-md text-left p-2 text-gray-950  hover:bg-gray-100 w-full"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
