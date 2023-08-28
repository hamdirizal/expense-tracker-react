import { Book } from "../types";

interface BookCardProps {
  book: Book;
  isActive: boolean;
  onActivate: (bookId: number) => void;
}

const BookCard = ({ book, isActive, onActivate }: BookCardProps) => {
  return (
    <div
      className={`p-2 mb-2 ${
        isActive
          ? "border-2 border-green-500 bg-green-200"
          : "border border-gray-400"
      }`}
    >
      <div>{book.title}</div>
      <div>Owner: {book.owner_id}</div>
      <button type="button" className="bg-gray-300 active:translate-y-[2px]">
        Manage
      </button>
      <div>
        {isActive ? (
          <span>Active book</span>
        ) : (
          <button
            type="button"
            onClick={() => {
              onActivate(book.id);
            }}
            className="bg-gray-300 active:translate-y-[2px]"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
