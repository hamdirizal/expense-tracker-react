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
    <table className="TxTable">
      <tbody>
        {transactions.map((tx: Transaction) => (
          <tr>
            <td>
              <div>
                <Link to="/">{tx.title}</Link>
              </div>
              <div>{tx.tx_date}</div>
              {tx.description ? <div>{tx.description}</div> : null}
            </td>
            <td>
              {tx.is_outgoing ? (
                <span className="AmountNegative">
                  {formatAsCurrency(tx.amount)}
                </span>
              ) : (
                <span className="AmountPositive">
                  {formatAsCurrency(tx.amount)}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
