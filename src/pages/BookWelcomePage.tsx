import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getStoredDefaultBookId } from "../helpers/storageHelper";
import { AppPaths } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";

const BookWelcomPage = () => {
  const storedDefaultBookId = getStoredDefaultBookId();
  const navigate = useNavigate();
  const [defaultBookId, setDefaultBookId] = useState<number>(0);

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
          No book selected. Please select or create a new one
        </h1>
        <button className="border border-white px-6 py-3" type="button">Select / Create Book</button>
      </div>
    );
  }
};

export default BookWelcomPage;
