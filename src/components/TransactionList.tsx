import { Transaction } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import TransactionCard from "./TransactionCard";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}
const TransactionList = ({ transactions, isLoading }: TransactionListProps) => {
  return (
    <div data-testid="TransactionList" className="relative">
      <div>
        {transactions.map((transaction) => (
          <TransactionCard transaction={transaction} key={transaction.id} />
        ))}
      </div>
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default TransactionList;
