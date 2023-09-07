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
    <div className="TransactionSummary">
      <h3 className="Heading3">Summary</h3>
      <ul>
        <li>
          <strong>{Texts.TODAY}</strong>
          <span>
            <PlusMinusSign isPlus={false} />
            {formatAsCurrency(summary.today_outgoing)}
          </span>
          <span>
            <PlusMinusSign isPlus={true} />
            {formatAsCurrency(summary.today_income)}
          </span>
        </li>
        <li>
          <strong>{Texts.THIS_MONTH}</strong>
          <span>
            <PlusMinusSign isPlus={false} />
            {formatAsCurrency(summary.this_month_outgoing)}
          </span>
          <span>
            <PlusMinusSign isPlus={true} />
            {formatAsCurrency(summary.this_month_income)}
          </span>
        </li>
        <li>
          <strong>{Texts.THIS_YEAR}</strong>
          <span>
            <PlusMinusSign isPlus={false} />
            {formatAsCurrency(summary.this_year_outgoing)}
          </span>
          <span>
            <PlusMinusSign isPlus={true} />
            {formatAsCurrency(summary.this_year_income)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TransactionSummary;
