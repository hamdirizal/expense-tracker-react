import { Link } from "react-router-dom";
import { Transaction } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import TransactionCard from "./TransactionCard";
import { formatAsCurrency } from "../helpers/globalHelper";
import PlusMinusSign from "./PlusMinusSign";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}
const TransactionList = ({ transactions, isLoading }: TransactionListProps) => {
  return (
    <div className="TransactionList">
      <table className="TransactionList__table">
        <tbody>
          {transactions.map((tx: Transaction) => (
            <tr key={tx.id}>
              <td>
                <div className="TransactionList__itemTitle">
                  <Link to="/">{tx.title}</Link>
                </div>
                <div className="TransactionList__itemDate">{tx.tx_date}</div>
                {tx.description ? (
                  <div className="TransactionList__itemDesc">
                    {tx.description}
                  </div>
                ) : null}
              </td>
              <td>
                <PlusMinusSign isPlus={tx.is_outgoing} />
                {formatAsCurrency(tx.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
