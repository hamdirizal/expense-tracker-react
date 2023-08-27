import { Transaction } from "../types";
import SectionTitle from "./SectionTitle";

interface TransactionListProps {
  transactions: Transaction[];
}
const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div data-testid="TransactionList">
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          {transaction.title} - {transaction.amount}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
