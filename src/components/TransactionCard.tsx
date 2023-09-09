import { Link, useNavigate } from "react-router-dom";

import { AppPaths } from "../constants";
import { formatAsCurrency } from "../helpers/globalHelper";
import SvgCalendarIcon from "../svg-components/SvgCalendarIcon";
import SvgPlusIcon from "../svg-components/SvgPlusIcon";
import { Transaction } from "../types";

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
          to={AppPaths.VIEW_TRANSACTION.replace(
            /:transaction_id/g,
            transaction.id.toString()
          ).replace(/:book_id/g, transaction.book_id.toString())}
        >
          view
        </Link>
      </div>
      <div className="TransactionCard__meta">
        <span className="TransactionCard__icon">
          <SvgCalendarIcon color="#333" />
        </span>{" "}
        <span className="TransactionCard__date">{transaction.tx_date}</span>
        <span className="TransactionCard__icon">
          <SvgPlusIcon color="#333" />
        </span>{" "}
        <span className="TransactionCard__amount">
          {formatAsCurrency(transaction.amount)}
        </span>
      </div>

      <div className="TransactionCard__description">
        {transaction.description}
      </div>
    </div>
  );
};

export default TransactionCard;
