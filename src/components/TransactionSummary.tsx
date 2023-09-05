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
      <h3 className="TransactionSummary__title">Summary</h3>
      <h4 className="TransactionSummary__colTitle">Today</h4>
      <div className="TransactionSummary__col">
        <div className="TransactionSummary__income">
          <span className="TransactionSummary__icon">
            <SvgPlusIcon color="#1ad971" />
          </span>
          {formatAsCurrency(summary.today_income)}
        </div>

        <div className="TransactionSummary__outgoing">
          <span className="TransactionSummary__icon">
            <SvgMinusIcon color="#ff005c" />
          </span>
          {formatAsCurrency(summary.today_outgoing)}
        </div>
      </div>
      <h4 className="TransactionSummary__colTitle">This month</h4>
      <div className="TransactionSummary__col">
        <div className="TransactionSummary__income">
          <span className="TransactionSummary__icon">
            <SvgPlusIcon color="#1ad971" />
          </span>
          {formatAsCurrency(summary.this_month_income)}
        </div>

        <div className="TransactionSummary__outgoing">
          <span className="TransactionSummary__icon">
            <SvgMinusIcon color="#ff005c" />
          </span>
          {formatAsCurrency(summary.this_month_outgoing)}
        </div>
      </div>
      <h4 className="TransactionSummary__colTitle">This year</h4>
      <div className="TransactionSummary__col">
        <div className="TransactionSummary__income">
          <span className="TransactionSummary__icon">
            <SvgPlusIcon color="#1ad971" />
          </span>
          {formatAsCurrency(summary.this_year_income)}
        </div>

        <div className="TransactionSummary__outgoing">
          <span className="TransactionSummary__icon">
            <SvgMinusIcon color="#ff005c" />
          </span>
          {formatAsCurrency(summary.this_year_outgoing)}
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
