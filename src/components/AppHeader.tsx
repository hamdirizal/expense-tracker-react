import { useContext } from "react";
import usePage from "../hooks/usePage";
import { Page } from "../types";
import { PageContext } from "../App";

const AppHeader = () => {
  const { currentPage, setCurrentPage } = useContext(PageContext);
  return (
    <header className="App-header">
      <span className="font-bold">Daily Expense</span>
      <button onClick={() => setCurrentPage(Page.DASHBOARD)}>Home</button>
      <span>Listing</span>
      <span>Search</span>
      <span>User: Hamdi</span>
    </header>
  );
};

export default AppHeader;
