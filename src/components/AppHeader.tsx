import { useContext } from "react";
import { Page } from "../types";
import { PageContext } from "../App";
import useLogoutUserMutation from "../services/useLogoutUserMutation";

const AppHeader = () => {
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const logoutUserMutation = useLogoutUserMutation();
  return (
    <header className="App-header">
      <span className="font-bold">Daily Expense</span>
      <button onClick={() => setCurrentPage(Page.DASHBOARD)}>Home</button>
      <span>Listing</span>
      <span>Search</span>
      <span>User: Hamdi</span>
      <button onClick={() => logoutUserMutation.mutate()}>(Logout)</button>
    </header>
  );
};

export default AppHeader;
