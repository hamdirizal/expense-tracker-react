
import { useState } from "react";

import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import Button from "./Button";

const CurrentBookPanel = () => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const renderInfo = () => {
    if (getAuthUserQuery.data?.active_book) {
      return <span>Book: {getAuthUserQuery.data.active_book.title} </span>;
    } else {
      return <span>No book selected. Click here to create/select a book</span>;
    }
  };

  return (
    <>
      <div className="flex">
        <Button
          isFullWidth={false}
          type="button"
          size="small"
          variant="secondary"
          label={
            getAuthUserQuery.data?.active_book
              ? `Book: ${getAuthUserQuery.data.active_book.title}`
              : "No book selected. Click here to create/select a book"
          }
          onClick={() => setIsModalOpened(true)}
        />
      </div>
    </>
  );
};

export default CurrentBookPanel;
