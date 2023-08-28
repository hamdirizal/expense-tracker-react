import { Book } from "../types";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";
import { findBookByIdOrUseFirstOne } from "../helpers/bookHelper";
import { Link } from "react-router-dom";
import { AppPaths } from "../constants";

const CurrentBookPanel = () => {
  const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const getUserConfigQuery = useGetUserConfigQuery();

  const renderInfo = (getOwnedBooksQuery: any) => {
    return null;
    // if (hasBooks && !activeBookId) {
    //   return (
    //     <div>
    //       No book selected.{" "}
    //       <Link className="bg-green-300" to={AppPaths.MANAGE_BOOKS}>
    //         Choose one here
    //       </Link>
    //     </div>
    //   );
    // } else if (hasBooks && activeBookId) {
    //   return (
    //     <div>
    //       Book: <span className="font-bold">{active_book.title}</span>{" "}
    //       <Link className="bg-green-300" to={AppPaths.MANAGE_BOOKS}>
    //         (manage books)
    //       </Link>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       You don't have any book.{" "}
    //       <Link className="bg-green-300" to={AppPaths.MANAGE_BOOKS}>
    //         Create one here
    //       </Link>
    //     </div>
    //   );
    // }
  };

  return (
    <div className="border px-2 relative rounded">
      {renderInfo(getOwnedBooksQuery)}
    </div>
  );
};

export default CurrentBookPanel;
