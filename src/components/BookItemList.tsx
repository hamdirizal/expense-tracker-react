import { useNavigate } from "react-router";

import { AppPaths } from "../constants/app-paths";
import { Book } from "../types";
import { Link } from "react-router-dom";

interface BookItemListProps {
  books: Book[];
  showOwner?: boolean;
}

const BookItemList = ({ books, showOwner = false }: BookItemListProps) => {
  const navigate = useNavigate();
  return (
    <div data-testid="BookItemList" className="RegularList">
      <ul className="RegularList__ul">
        {books.map((book: Book) => {
          return (
            <li key={book.id} className="RegularList__li">
              <Link
                className="BookItemList__itemTitle"
                to={AppPaths.BOOK_SINGLE.replace(
                  ":book_id",
                  book.id.toString()
                )}
              >
                {book.title}
              </Link>
              {showOwner ? (
                <span className="BookItemList__itemOwner">
                  ({book.owner_nickname || book.owner_email})
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookItemList;
