import { Book } from "../types";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";
import { findBookByIdOrUseFirstOne } from "../helpers/bookHelper";
import { Link } from "react-router-dom";
import { AppPaths } from "../constants";
import VarDump from "./VarDump";
import SvgBookIcon from "../svg-components/SvgBookIcon";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Modal from "./Modal";
import ModalSelectBook from "./ModalSelectBook";
import Button from "./Button";

const CurrentBookPanel = () => {
  // const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const getUserConfigQuery = useGetUserConfigQuery();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const renderInfo = () => {
    if (getUserConfigQuery.data?.active_book) {
      return <span>Book: {getUserConfigQuery.data.active_book.title} </span>;
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
            getUserConfigQuery.data?.active_book
              ? `Book: ${getUserConfigQuery.data.active_book.title}`
              : "No book selected. Click here to create/select a book"
          }
          onClick={() => setIsModalOpened(true)}
        />
      </div>
      <ModalSelectBook
        isOpen={isModalOpened}
        closeFn={() => setIsModalOpened(false)}
      />
    </>
  );
};

export default CurrentBookPanel;
