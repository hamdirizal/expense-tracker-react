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
      <table className="TransactionSummary__table">
        <tbody>
          <tr>
            <td colSpan={2}>
              <h4 className="TransactionSummary__colTitle">Today</h4>
            </td>
          </tr>
          <tr>
            <td>
              <div className="TransactionSummary__income">
                <span className="TransactionSummary__icon">
                  <SvgPlusIcon color="#333" />
                </span>
                {formatAsCurrency(summary.today_income)}
              </div>
            </td>
            <td>
              <div className="TransactionSummary__outgoing">
                <span className="TransactionSummary__icon">
                  <SvgMinusIcon color="#333" />
                </span>
                {formatAsCurrency(summary.today_outgoing)}
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <h4 className="TransactionSummary__colTitle">This month</h4>
            </td>
          </tr>
          <tr>
            <td>
              <div className="TransactionSummary__income">
                <span className="TransactionSummary__icon">
                  <SvgPlusIcon color="#333" />
                </span>
                {formatAsCurrency(summary.this_month_income)}
              </div>
            </td>
            <td>
              <div className="TransactionSummary__outgoing">
                <span className="TransactionSummary__icon">
                  <SvgMinusIcon color="#333" />
                </span>
                {formatAsCurrency(summary.this_month_outgoing)}
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <h4 className="TransactionSummary__colTitle">This year</h4>
            </td>
          </tr>
          <tr>
            <td>
              <div className="TransactionSummary__income">
                <span className="TransactionSummary__icon">
                  <SvgPlusIcon color="#333" />
                </span>
                {formatAsCurrency(summary.this_year_income)}
              </div>
            </td>
            <td>
              <div className="TransactionSummary__outgoing">
                <span className="TransactionSummary__icon">
                  <SvgMinusIcon color="#333" />
                </span>
                {formatAsCurrency(summary.this_year_outgoing)}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionSummary;
