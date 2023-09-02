import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getStoredDefaultBookId } from "../helpers/storageHelper";
import { AppPaths } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";
import ModalSelectBook from "../components/ModalSelectBook";

const BookWelcomPage = () => {
  const storedDefaultBookId = getStoredDefaultBookId();
  const navigate = useNavigate();
  const [defaultBookId, setDefaultBookId] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setDefaultBookId(storedDefaultBookId);
  }, []);

  if (defaultBookId) {
    navigate(
      AppPaths.BOOK_DASHBOARD.replace(/:book_id/g, defaultBookId.toString())
    );
  } else {
    return (
      <div>
        <h1>No book selected. Please select or create a new one</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-white px-6 py-3"
          type="button"
        >
          Select / Create Book
        </button>
        <ModalSelectBook
          isOpen={isModalOpen}
          closeFn={() => setIsModalOpen(false)}
        />
      </div>
    );
  }
};

export default BookWelcomPage;
