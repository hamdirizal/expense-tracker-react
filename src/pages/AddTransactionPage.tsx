import { Helmet } from "react-helmet";
import PageTitle from "../components/PageTitle";
import { AppTitle } from "../constants";

const AddTransactionPage = () => {
  return (
    <>
      <Helmet>
        <title>Add Transaction | {AppTitle}</title>
      </Helmet>
      <PageTitle title="Add transaction" />;
    </>
  );
};

export default AddTransactionPage;
