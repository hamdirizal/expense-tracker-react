import { Transaction } from "../types";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <div className="p-2 mb-2 border border-gray-400">
      <div>{transaction.title}</div>
      <div>{transaction.amount}</div>
      <div>{transaction.is_outgoing}</div>
      <div>{transaction.description}</div>
    </div>
  );
};

export default TransactionCard;
