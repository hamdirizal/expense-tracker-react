import { useContext } from "react";
import { Page } from "../types";
import { PageContext } from "../App";
import useLogoutUserMutation from "../services/useLogoutUserMutation";

const AppHeader = () => {
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const logoutUserMutation = useLogoutUserMutation();
  return (
    <header className="App-header flex justify-between">
      <span className="font-bold">Daily Expense</span>

      <button onClick={() => setCurrentPage(Page.DASHBOARD)}>Home</button>
      <span>Listing</span>
      <button onClick={() => setCurrentPage(Page.ADD_TRANSACTION)}>Add Transaction</button>
      <span>Search</span>
      <span>
        Welcome Hamdi{" "}
        <button onClick={() => logoutUserMutation.mutate()}>(Logout)</button>
      </span>
    </header>
  );
};

export default AppHeader;
