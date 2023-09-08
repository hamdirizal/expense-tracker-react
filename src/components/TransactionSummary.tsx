import { Texts } from "../constants";
import { formatAsCurrency } from "../helpers/globalHelper";
import SvgMinusIcon from "../svg-components/SvgMinusIcon";
import SvgPlusIcon from "../svg-components/SvgPlusIcon";
import { TxSummary } from "../types";
import PlusMinusSign from "./PlusMinusSign";

interface TransactionSummaryProps {
  summary: TxSummary | null;
}

const TransactionSummary = ({ summary }: TransactionSummaryProps) => {
  if (!summary) return null;
  return (
    <table className="TxSummaryTable">
      <tbody>
        <tr>
          <td></td>
          <td>{Texts.TODAY}</td>
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
          <td></td>
          <td>{Texts.THIS_MONTH}</td>
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
          <td></td>
          <td>{Texts.THIS_YEAR}</td>
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
