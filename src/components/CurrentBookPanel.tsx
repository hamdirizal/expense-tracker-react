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
        <button
          onClick={() => setIsModalOpened(true)}
          className="flex border relative rounded bg-slate-200 px-2 py-1 active:scale-95"
        >
          <span className="block w-6 h-6 mr-2">
            <SvgBookIcon />
          </span>
          {renderInfo()}
        </button>
      </div>
      <ModalSelectBook
        isOpen={isModalOpened}
        closeFn={() => setIsModalOpened(false)}
      />
    </>
  );
};

export default CurrentBookPanel;
