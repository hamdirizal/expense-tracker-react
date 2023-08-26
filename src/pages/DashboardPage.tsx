import { useContext, useEffect } from "react";
import CurrentBookPanel from "../components/CurrentBookPanel";
import PageTitle from "../components/PageTitle";
import VarDump from "../components/VarDump";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { PageContext } from "../App";
import { Page } from "../types";

const DashboardPage = () => {
  return (
    <div>
      <PageTitle title="Dashboard" />
      <CurrentBookPanel />
    </div>
  );
};

export default DashboardPage;
