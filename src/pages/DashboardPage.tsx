import { useContext, useEffect } from "react";
import CurrentBookPanel from "../components/CurrentBookPanel";
import PageTitle from "../components/PageTitle";
import VarDump from "../components/VarDump";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { PageContext } from "../App";
import { Page } from "../types";

const DashboardPage = () => {
  const getAuthUserState = useGetAuthUserQuery();
  const { currentPage, setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    if (!getAuthUserState.isSuccess) {
      setCurrentPage(Page.LOGIN);
    }
  }, [getAuthUserState]);

  return (
    <div>
      <VarDump content={JSON.stringify(getAuthUserState)} />
      <PageTitle title="Dashboard" />
      <CurrentBookPanel />
    </div>
  );
};

export default DashboardPage;
