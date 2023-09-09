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
            <div className="FakeDisabledInput FakeDisabledInput--short">{transaction.is_outgoing ? "Outgoing" : "Incoming"}</div>
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
            <div className="FakeDisabledInput">{transaction.title || ""}</div>
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
            <div className="FakeDisabledInput">{transaction.description || ""}</div>
          </div>
          <div className="FormRow">
            <label className="FieldLabel">{Texts.INPUTLABEL_CREATEDBY}</label>
            <div className="FakeDisabledInput">{transaction.creator_nickname || transaction.creator_email}</div>
          </div>
        </div>
      </>
    );
  };

  return renderFinalMarkup();
};

export default ViewTransactionForm;
