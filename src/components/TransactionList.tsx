import { Transaction } from "../types";
import LoadingSpinner from "./LoadingSpinner";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}
const TransactionList = ({ transactions, isLoading }: TransactionListProps) => {
  return (
    <div data-testid="TransactionList" className="relative">
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            {transaction.title} - {transaction.amount}
          </div>
        ))}
      </div>
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default TransactionList;
