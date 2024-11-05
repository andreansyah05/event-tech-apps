import { useContext, createContext, useState } from "react";
import { LoginAuth, UserProps } from "@/models/models";

// Define the interface
interface UserProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: UserProps | null;
  isLogin: boolean;
  isLoading: boolean;
  userLogin: (userData: UserProps | null) => void;
  userLogout: () => void;
  updateUserPoint: (referralCode: string) => void;
}

// Create Context and define the default value
const AuthContext = createContext<AuthContextProps>({
  isLogin: false,
  isLoading: false,
  user: null,
  userLogin: () => {},
  userLogout: () => {},
  updateUserPoint: () => {},
});

export function AuthProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function userLogin(userData: UserProps | null) {
    if (userData) {
      setUser(userData);
      setIsLogin(true);
    } else {
      setUser(null);
      setIsLogin(false);
    }
  }

  function userLogout() {
    setUser(null);
    setIsLogin(false);
  }

  function updateUserPoint(referralCode: string) {
    // update state point of the user
    if (user) {
      setUser({
        ...user,
        referral_use: referralCode,
        points: user.points + 20000,
      });
    }
  }

  function handleFetchDataUser() {}

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin,
        userLogin,
        userLogout,
        isLoading,
        updateUserPoint,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
