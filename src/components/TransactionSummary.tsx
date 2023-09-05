import { TxSummary } from "../types";

interface TransactionSummaryProps {
  summary: TxSummary | null;
}

const TransactionSummary = ({ summary }: TransactionSummaryProps) => {
  if (!summary) return null;
  return (
    <div className="TransactionSummary">
      <h3 className="TransactionSummary__title">Summary</h3>
      <h3 className="TransactionSummary__colTitle">Today</h3>
      <div className="TransactionSummary__col">
        <div className="TransactionSummary__income">
          +{summary.today_income}
        </div>
        <div className="TransactionSummary__separator">/</div>
        <div className="TransactionSummary__outgoing">
          -{summary.today_outgoing}
        </div>
      </div>
      <h3 className="TransactionSummary__colTitle">This month</h3>
      <div className="TransactionSummary__col">
        <div className="TransactionSummary__income">
          +{summary.this_month_income}
        </div>
        <div className="TransactionSummary__separator">/</div>
        <div className="TransactionSummary__outgoing">
          -{summary.this_month_outgoing}
        </div>
      </div>
      <h3 className="TransactionSummary__colTitle">This year</h3>
      <div className="TransactionSummary__col">
        <div className="TransactionSummary__income">
          +{summary.this_year_income}
        </div>
        <div className="TransactionSummary__separator">/</div>
        <div className="TransactionSummary__outgoing">
          -{summary.this_year_outgoing}
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
