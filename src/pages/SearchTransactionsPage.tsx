import { Link, useParams } from "react-router-dom";
import { AppPaths, Texts } from "../constants";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";
import SearchTransactionsForm from "../components/SearchTransactionsForm";

const SearchTransactionsPage = () => {
  const { book_id } = useParams();

  const getSingleBookQuery = useGetSingleBookQuery(parseInt(book_id || "0"));

  return (
    <>
      <ul className="Breadcrumbs">
        <li>
          ⚓ <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
        </li>
        <li>
          <Link to={AppPaths.BOOK_SINGLE.replace(/:book_id/, book_id || "")}>
            {getSingleBookQuery.data?.title || ""}
          </Link>
        </li>
        <li>
          <span>{Texts.SEARCH_TRANSACTIONS}</span>
        </li>
      </ul>
      <SearchTransactionsForm />
    </>
  );
};

export default SearchTransactionsPage;
