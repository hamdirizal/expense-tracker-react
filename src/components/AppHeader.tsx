import usePage from "../hooks/usePage";
import { Page } from "../types";

const AppHeader = () => {
  const { switchPage } = usePage();
  return (
    <header className="App-header">
      <span className="font-bold">Daily Expense</span>
      <button onClick={() => switchPage(Page.DASHBOARD)}>Home</button>
      <span>Listing</span>
      <span>Search</span>
      <span>User: Hamdi</span>
    </header>
  );
};

export default AppHeader;
