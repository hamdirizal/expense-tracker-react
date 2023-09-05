import { Link, useNavigate } from "react-router-dom";
import { Transaction } from "../types";
import { AppPaths } from "../constants";
import { formatAsCurrency } from "../helpers/globalHelper";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="TransactionCard">
      <div className="TransactionCard__titleBox">
        <span className="TransactionCard__title">{transaction.title}</span>
        <Link
          className="TransactionCard__action"
          to={AppPaths.EDIT_TRANSACTION.replace(
            /:transaction_id/g,
            transaction.id.toString()
          )}
        >
          [view]
        </Link>
      </div>
      <div className="TransactionCard__meta">
        Date:{" "}
        <span className="TransactionCard__date">{transaction.tx_date}</span>
        Amount:{" "}
        <span className="TransactionCard__amount">{formatAsCurrency(transaction.amount)}</span>
      </div>

      <div className="TransactionCard__description">{transaction.description}</div>
    </div>
  );
};

export default TransactionCard;
