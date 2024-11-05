import { useAuth } from "@/utils/userContext";
import NavigationBar from "@/components/NavigationBar";

function TransactionHistory() {
  const { isLogin, user } = useAuth();

  return (
    <>
      <NavigationBar
        isLogin={isLogin}
        userRole="user"
        name={user?.name}
        point={user?.points}
      />
    </>
  );
}

export default TransactionHistory;
