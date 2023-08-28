import CurrentBookPanel from "../components/CurrentBookPanel";
import PageTitle from "../components/PageTitle";

const DashboardHomePage = () => {
  return (
    <div>
      <CurrentBookPanel />
      <PageTitle title="Dashboard" />
    </div>
  );
};

export default DashboardHomePage;
