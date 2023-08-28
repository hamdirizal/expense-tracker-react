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
      <Dialog
        className="border-2 border-red-500 fixed inset-0 items-start justify-center flex"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 bg-black/70 z-10 flex " aria-hidden="true" />
        <Dialog.Panel className="w-[90vw] border-2 border-green-500 bg-white z-20 relative">
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default CurrentBookPanel;
