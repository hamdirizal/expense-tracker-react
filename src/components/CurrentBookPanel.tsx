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

const CurrentBookPanel = () => {
  // const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const getUserConfigQuery = useGetUserConfigQuery();

  const [isOpen, setIsOpen] = useState(false);

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
        <Link
          className="flex border relative rounded bg-slate-200 px-2 py-1 active:scale-95"
          to={AppPaths.MANAGE_BOOKS}
        >
          <span className="block w-6 h-6 mr-2">
            <SvgBookIcon />
          </span>
          {renderInfo()}
        </Link>
        <button onClick={() => setIsOpen(true)}>Open modal</button>
      </div>
      <Modal
        isOpen={isOpen}
        closeFn={() => setIsOpen(false)}
        content={<h1>Hello world modal</h1>}
      />
    </>
  );
};

export default CurrentBookPanel;
