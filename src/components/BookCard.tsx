import { Book } from "../types";
import Button from "./Button";

interface BookCardProps {
  book: Book;
  isActive: boolean;
  onActivate: (bookId: number) => void;
}

const BookCard = ({ book, isActive, onActivate }: BookCardProps) => {
  return (
    <div
      className={`px-4 py-3 mb-3 border rounded ${
        isActive
          ? "border-color-border-active bg-color-bg-active"
          : "border-grey-input-border bg-grey-bg-2"
      }`}
    >
      <div>
        <span className="font-bold text-white-text mr-2">{book.title}</span>
        {isActive ? <span>(selected)</span> : null}
      </div>
      <div className="text-minus-1">Owner: John Doe</div>
      <div className="flex justify-start mt-2">
        <Button
          isFullWidth={false}
          size="small"
          type="button"
          variant="secondary"
          onClick={() => {}}
          label="Manage"
        />
        <div className="w-2"></div>
        {isActive ? null : (
          <Button
            isFullWidth={false}
            size="small"
            type="button"
            variant="secondary"
            onClick={() => {
              onActivate(book.id);
            }}
            label="Select"
          />
        )}
      </div>
    </div>
  );
};

export default BookCard;
