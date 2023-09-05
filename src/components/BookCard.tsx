import { Book } from "../types";
import Button from "./Button";

interface BookCardProps {
  book: Book;
  isActive: boolean;
  onActivate: (bookId: number) => void;
}

const BookCard = ({ book, isActive, onActivate }: BookCardProps) => {
  return (
    <div className="BookCard">
      <div>
        <div className="BookCard__head">
          <span className="BookCard__title">{book.title}</span>
          {isActive ? (
            <span>Selected</span>
          ) : (
            <button
              onClick={() => {
                onActivate(book.id);
              }}
              className="ButtonLink"
            >
              select
            </button>
          )}
        </div>
        <div className="BookCard__owner">Owner: Aldhia</div>
      </div>
    </div>
  );
};

export default BookCard;
