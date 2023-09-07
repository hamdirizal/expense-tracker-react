import { useNavigate } from "react-router";
import { Book } from "../types";
import { AppPaths } from "../constants";

interface BookListProps {
  books: Book[];
}

const BookList = ({ books }: BookListProps) => {
  const navigate = useNavigate();
  return (
    <div className="BookList">
      {books.map((book: Book) => {
        return (
          <div key={book.id} className="BookList__item">
            <button
              type="button"
              onClick={() => {
                navigate(
                  AppPaths.BOOK_DASHBOARD.replace(
                    ":book_id",
                    book.id.toString()
                  )
                );
              }}
              className="BookList__itemTitle"
            >
              {book.title}
            </button>
            <div className="BookList__itemOwner">
              Owner: {book.owner_id.substring(0, 6)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
