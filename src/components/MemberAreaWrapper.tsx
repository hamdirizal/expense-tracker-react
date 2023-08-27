import { useContext, useEffect } from "react";
import AppHeader from "./AppHeader";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import { Page } from "../types";
import { PageContext } from "../App";

interface MemberAreaWrapperProps {
  content: JSX.Element;
}

const MemberAreaWrapper = ({ content }: MemberAreaWrapperProps) => {
  const getAuthUserState = useGetAuthUserQuery();
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    if (!getAuthUserState.isSuccess) {
      console.log('moving to login')
      // setCurrentPage(Page.LOGIN);
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
