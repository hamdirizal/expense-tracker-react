import { Texts } from "../constants/texts";
import { formatAsCurrency } from "../helpers/globalHelper";
import { TxSummary } from "../types";

interface TransactionSummaryProps {
  summary: TxSummary | null;
}

const TransactionSummary = ({ summary }: TransactionSummaryProps) => {
  if (!summary) return null;
  return (
    <table className="TxSummaryTable">
      <tbody>
        <tr>
          <td colSpan={2}>{Texts.TODAY}</td>
        </tr>
        <tr>
          <td>
            <span className="AmountNegative">
              {formatAsCurrency(summary.today_outgoing)}
            </span>
          </td>
          <td>
            <span className="AmountPositive">
              {formatAsCurrency(summary.today_income)}
            </span>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>{Texts.THIS_MONTH}</td>
        </tr>
        <tr>
          <td>
            <span className="AmountNegative">
              {formatAsCurrency(summary.this_month_outgoing)}
            </span>
          </td>
          <td>
            <span className="AmountPositive">
              {formatAsCurrency(summary.this_month_income)}
            </span>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>{Texts.THIS_YEAR}</td>
        </tr>
        <tr>
          <td>
            <span className="AmountNegative">
              {formatAsCurrency(summary.this_year_outgoing)}
            </span>
          </td>
          <td>
            <span className="AmountPositive">
              {formatAsCurrency(summary.this_year_income)}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TransactionSummary;
