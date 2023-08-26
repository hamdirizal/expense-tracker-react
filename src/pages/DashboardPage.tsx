import CurrentBookPanel from "../components/CurrentBookPanel";
import PageTitle from "../components/PageTitle";

const DashboardPage = () => {
  return (
    <div>
      <PageTitle title="Dashboard" />
      <CurrentBookPanel />
    </div>
  );
};

export default DashboardPage;
