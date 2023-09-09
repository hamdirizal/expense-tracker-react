import { Link, useParams } from "react-router-dom";

import { AppPaths } from "../constants";
import { formatAsCurrency } from "../helpers/globalHelper";
import { Transaction } from "../types";

interface TransactionListProps {
  transactions: Transaction[];
}
const TransactionList = ({ transactions }: TransactionListProps) => {
  const { book_id } = useParams();

  return (
    <table className="TxTable">
      <tbody>
        {transactions.map((tx: Transaction) => (
          <tr key={tx.id}>
            <td>
              <div>
                <Link
                  to={AppPaths.SINGLE_TRANSACTION.replace(
                    /:book_id/g,
                    book_id || "0"
                  ).replace(/:transaction_id/g, tx.id.toString())}
                >
                  {tx.title}
                </Link>
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
