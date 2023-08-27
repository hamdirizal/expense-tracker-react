import { useContext, useEffect } from "react";
import AppHeader from "./AppHeader";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { Page } from "../types";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";
import VarDump from "./VarDump";
import useCreateUserConfigMutation from "../services/useCreateUserConfigMutation";
import { PageContext } from "../App";

interface MemberAreaWrapperProps {
  content: JSX.Element;
}

const MemberAreaWrapper = ({ content }: MemberAreaWrapperProps) => {
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

export default MemberAreaWrapper;
