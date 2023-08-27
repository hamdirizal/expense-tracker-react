import CurrentBookPanel from "../components/CurrentBookPanel";
import PageTitle from "../components/PageTitle";

const DashboardHomePage = () => {
  return (
    <div>
      <PageTitle title="Dashboard" />
      <CurrentBookPanel />
    </div>
  );
};

export default DashboardHomePage;
