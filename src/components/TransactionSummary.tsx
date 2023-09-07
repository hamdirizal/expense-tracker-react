import { Texts } from "../constants";
import { formatAsCurrency } from "../helpers/globalHelper";
import SvgMinusIcon from "../svg-components/SvgMinusIcon";
import SvgPlusIcon from "../svg-components/SvgPlusIcon";
import { TxSummary } from "../types";

interface TransactionSummaryProps {
  summary: TxSummary | null;
}

const TransactionSummary = ({ summary }: TransactionSummaryProps) => {
  if (!summary) return null;
  return (
    <div className="TransactionSummary">
      <h3 className="Heading3">Summary</h3>
      <ul>
        <li>
          <strong>Today</strong>
          <span>
            <b>🟢</b>
            {formatAsCurrency(summary.today_income)}
          </span>
          <span>
            <b>🔴</b>
            {formatAsCurrency(summary.today_outgoing)}
          </span>
        </li>
        <li>
          <strong>Today</strong>
          <span>
            <b>🟢</b>
            {formatAsCurrency(summary.this_month_income)}
          </span>
          <span>
            <b>🔴</b>
            {formatAsCurrency(summary.this_month_outgoing)}
          </span>
        </li>
        <li>
          <strong>{Texts.THIS_YEAR}</strong>
          <span>
            <b>🟢</b>
            {formatAsCurrency(summary.this_year_income)}
          </span>
          <span>
            <b>🔴</b>
            {formatAsCurrency(summary.this_year_outgoing)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TransactionSummary;
