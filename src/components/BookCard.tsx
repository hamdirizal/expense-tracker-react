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
        <div className="BookCard__title">{book.title}</div>
        <div className="BookCard__owner">Owner: Aldhia</div>
      </div>
      <div className="flex justify-start mt-2">
        {isActive ? (
          <div>Selected</div>
        ) : (
          <button
            onClick={() => {
              onActivate(book.id);
            }}
            className="ButtonSecondary"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
