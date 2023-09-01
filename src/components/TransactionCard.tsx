import { Link, useNavigate } from "react-router-dom";
import { Transaction } from "../types";
import { AppPaths } from "../constants";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="p-2 mb-2 border border-gray-400">
      <div>{transaction.title}</div>
      <div>{transaction.amount}</div>
      <div>{transaction.is_outgoing}</div>
      <div>{transaction.description}</div>
      <Link to={AppPaths.EDIT_TRANSACTION.replace(
              /:transaction_id/g,
              transaction.id.toString()
            )} >View</Link>
    </div>
  );
};

export default TransactionCard;
