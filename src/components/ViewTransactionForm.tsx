import { Texts } from "../constants";
import { Transaction } from "../types";

interface ViewTransactionFormProps {
  transaction: Transaction;
}

const ViewTransactionForm = ({ transaction }: ViewTransactionFormProps) => {
  const renderFinalMarkup = () => {
    return (
      <>
        <div className="AddTransactionForm">
          <div className="FormRow">
            <label className="FieldLabel">{Texts.INPUTLABEL_TYPE}</label>
            <input
              value={transaction.is_outgoing ? "Outgoing" : "Incoming"}
              className="InputText InputText--short"
              disabled
              type="text"
            />
          </div>
          <div className="FormRow">
            <label className="FieldLabel">{Texts.INPUTLABEL_DATE}</label>
            <input
              value={transaction.tx_date}
              className="InputText InputText--short"
              disabled
              type="text"
            />
          </div>

          <div className="FormRow">
            <label className="FieldLabel">{Texts.INPUTLABEL_TITLE}</label>
            <input
              value={transaction.title}
              className="InputText"
              type="text"
              disabled
            />
          </div>
          <div className="FormRow">
            <label className="FieldLabel">{Texts.INPUTLABEL_AMOUNT}</label>
            <input
              value={transaction.amount}
              className="InputText"
              type="text"
              disabled
            />
          </div>
          <div className="FormRow">
            <label className="FieldLabel">{Texts.INPUTLABEL_DESCRIPTION}</label>
            <textarea
              disabled
              className="InputText"
              value={transaction.description || ""}
            ></textarea>
          </div>
          <div className="FormRow">
            <label className="FieldLabel">{Texts.INPUTLABEL_CREATEDBY}</label>
            <input
              value={transaction.creator_id}
              className="InputText"
              disabled
              type="text"
            />
          </div>
        </div>
      </>
    );
  };

  return renderFinalMarkup();
};

export default ViewTransactionForm;
