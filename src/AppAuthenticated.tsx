import { useContext, useEffect } from "react";
import AppHeader from "./components/AppHeader";
import useGetAuthUserQuery from "./services/useGetAuthUserQuery";
import { PageContext } from "./App";
import { Page } from "./types";

interface AppAuthenticatedProps {
  content: JSX.Element;
}

const AppAuthenticated = ({ content }: AppAuthenticatedProps) => {
  const getAuthUserState = useGetAuthUserQuery();
  const { currentPage, setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    if (!getAuthUserState.isSuccess) {
      setCurrentPage(Page.LOGIN);
    }
  }, [getAuthUserState]);
  return (
    <>
      <AppHeader />
      {content}
    </>
  );
};

export default AppAuthenticated;
