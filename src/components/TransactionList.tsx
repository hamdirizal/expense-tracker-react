import { Link } from "react-router-dom";

import { formatAsCurrency } from "../helpers/globalHelper";
import { Transaction } from "../types";

interface TransactionListProps {
  transactions: Transaction[];
}
const TransactionList = ({ transactions }: TransactionListProps) => {
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
