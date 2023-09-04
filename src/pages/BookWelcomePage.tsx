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
        <h1>
          No book selected. Please{" "}
          <button
            className="ButtonLink"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            <strong>select or create a new one</strong>
          </button>
        </h1>
        <ModalSelectBook
          isOpen={isModalOpen}
          closeFn={() => setIsModalOpen(false)}
        />
      </div>
    );
  }
};

export default BookWelcomPage;
