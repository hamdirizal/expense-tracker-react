import useLogoutUserMutation from "../services/useLogoutUserMutation";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const logoutUserMutation = useLogoutUserMutation();
  return (
    <header
      data-testid="AppHeader"
      className="flex justify-between mb-2 border-b-2"
    >
      <span className="font-bold">Daily Expense</span>

      <Link to="/dashboard">Home</Link>
      <span>Listing</span>
      <Link to="/dashboard/add-transaction">Add Transaction</Link>
      <span>Search</span>
      <span>
        Welcome Hamdi{" "}
        <button onClick={() => logoutUserMutation.mutate()}>(Logout)</button>
      </span>
    </header>
  );
};

export default AppHeader;
