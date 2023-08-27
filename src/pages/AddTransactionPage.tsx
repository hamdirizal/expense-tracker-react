import { Helmet } from "react-helmet";
import PageTitle from "../components/PageTitle";
import { AppTitle } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";

const AddTransactionPage = () => {
  return (
    <>
      <Helmet>
        <title>Add Transaction | {AppTitle}</title>
      </Helmet>
      <PageTitle title="Add transaction" />
      <CurrentBookPanel />
    </>
  );
};

export default AddTransactionPage;
