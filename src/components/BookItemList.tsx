import { useNavigate } from "react-router";

import { AppPaths } from "../constants";
import { Book } from "../types";

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
              <button
                type="button"
                onClick={() => {
                  navigate(
                    AppPaths.BOOK_SINGLE.replace(
                      ":book_id",
                      book.id.toString()
                    )
                  );
                }}
                className="BookItemList__itemTitle"
              >
                {book.title}
              </button>
              <span className="BookItemList__itemOwner">
                ({book.owner_id.substring(0, 6)})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookItemList;
