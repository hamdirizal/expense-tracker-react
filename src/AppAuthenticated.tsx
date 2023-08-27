import { useContext, useEffect } from "react";
import AppHeader from "./components/AppHeader";
import useGetAuthUserQuery from "./services/useGetAuthUserQuery";
import { PageContext } from "./App";
import { Page } from "./types";
import useGetUserConfigQuery from "./services/useGetUserConfigQuery";
import VarDump from "./components/VarDump";
import useCreateUserConfigMutation from "./services/useCreateUserConfigMutation";

interface AppAuthenticatedProps {
  content: JSX.Element;
}

const AppAuthenticated = ({ content }: AppAuthenticatedProps) => {
  const getAuthUserState = useGetAuthUserQuery();
  const getUserConfigState = useGetUserConfigQuery();
  const createUserConfigMutation = useCreateUserConfigMutation();
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
