import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";
import ErrorDiv from "../components/ErrorDiv";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import ModalSelectBook from "../components/ModalSelectBook";
import { AppPaths, Texts } from "../constants";
import Heading3 from "../components/Heading3";
import CurrentBookLine from "../components/CurrentBookLine";
import useGetTransactionSummaryQuery from "../services/useGetTransactionSummaryQuery";
import TransactionSummary from "../components/TransactionSummary";
import { Transaction } from "../types";
import TransactionCard from "../components/TransactionCard";
import SgvArrowLeftIcon from "../svg-components/SgvArrowLeftIcon";
import SvgAddIcon from "../svg-components/SvgAddIcon";
import LinkWithEmoji from "../components/LinkWithEmoji";
import { getBookEmoji } from "../helpers/globalHelper";
import TransactionList from "../components/TransactionList";
import PlusMinusSign from "../components/PlusMinusSign";

const BookDashboardPage = () => {
  const { book_id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSingleBookQuery = useGetSingleBookQuery(parseInt(book_id || "0"));

  const getRecentTransactionsQuery = useGetRecentTransactionsQuery(
    parseInt(book_id || "0")
  );

  const getTransactionSummaryQuery = useGetTransactionSummaryQuery(
    parseInt(book_id || "0")
  );

  const renderFinalMarkup = () => {
    return (
      <>
        <ul className="Breadcrumbs">
          <li>
            ⚓ <Link to={AppPaths.DASHBOARD}>{Texts.DASHBOARD}</Link>
          </li>
          <li>
            <span>{getSingleBookQuery.data?.title || ""}</span>
          </li>
        </ul>

        <div className="Heading3">🔆 {Texts.ACTIONS}</div>
        <div className="RegularList">
          <ul className="RegularList__ul">
            <li className="RegularList__li">Add transaction</li>
            <li className="RegularList__li">Listing</li>
            <li className="RegularList__li">Search</li>
            <li className="RegularList__li">Manage</li>
          </ul>
        </div>
        <div className="HSpace2"></div>
        <div className="Heading3">📋 {Texts.SUMMARY}</div>
        <TransactionSummary summary={getTransactionSummaryQuery.data || null} />
        
        <div className="HSpace2"></div>
        <div className="Heading3">🕐 {Texts.RECENTLY_ADDED}</div>
        <table className="TxTable">
          <tbody>
            <tr>
              
              <td>
                <div>
                  <Link to="sf">Bayar transport ke surabaya</Link>
                </div>
                <div>2023-08-21</div>
                <div>
                  Perjalanan panjang bersama teman teman. Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit.
                </div>
              </td>
              <td>
                <span className="AmountNegative">200.000</span>
              </td>
            </tr>
            <tr>
              
              <td>
                <div>Makan siang</div>
                <div>2023-08-21</div>
              </td>
              <td>
                <span className="AmountNegative">30.000</span>
              </td>
            </tr>
            <tr>
              
              <td>
                <div>Bayaran</div>
                <div>2023-08-21</div>
              </td>
              <td>
                <span className="AmountPositive">5.000.000</span>
              </td>
            </tr>
            <tr>
              
              <td>
                <div>Bayar Listrik</div>
                <div>2023-08-21</div>
              </td>
              <td>
                <span className="AmountNegative">500.000</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="HSpace2"></div>
        <div className="RegularList">
          <ul className="RegularList__ul">
            <li className="RegularList__li">
              <div>
                2023-08-21 <span className="CharSpace1"></span>
                <span>Bayar transport</span>
                <span className="AmountNegative">200.000</span>
              </div>
              <div> </div>
              <div>Perjalanan ke surabaya</div>
            </li>
            <li className="RegularList__li">
              <div>
                2023-08-21 <span className="CharSpace1"></span>
                <span>Bayar transport</span>
                <span className="AmountPositive">200.000</span>
              </div>
              <div> </div>
              <div>Perjalanan ke surabaya</div>
            </li>
          </ul>
        </div>

        <table className="BookActions">
          <tbody>
            <tr>
              <td>
                {book_id ? (
                  <LinkWithEmoji
                    to={AppPaths.ADD_TRANSACTION.replace(/:book_id/g, book_id)}
                    label={Texts.ADD_TRANSACTION}
                    emoji="➕"
                  />
                ) : null}
              </td>
              <td>
                <LinkWithEmoji to={""} label={Texts.LISTING} emoji="📝" />
              </td>
            </tr>
            <tr>
              <td>
                <LinkWithEmoji to={""} label={Texts.SEARCH} emoji="🔍" />
              </td>
              <td>
                <LinkWithEmoji to={""} label={Texts.MANAGE} emoji="⚙️" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="HSpace2"></div>

        <h3 className="Heading3">🗒️ {Texts.SUMMARY}</h3>

        
        <div className="HSpace2"></div>

        <h3 className="Heading3">🗒️ {Texts.RECENTLY_ADDED}</h3>

        {getRecentTransactionsQuery.data ? (
          <TransactionList
            isLoading={getRecentTransactionsQuery.isLoading}
            transactions={getRecentTransactionsQuery.data}
          />
        ) : null}
      </>
    );
  };

  return (
    <div data-testid="BookDashboardpage">
      {getSingleBookQuery.data ? renderFinalMarkup() : null}
      {getSingleBookQuery.isError && (
        <ErrorDiv error={getSingleBookQuery.error.message} />
      )}
      <ModalSelectBook
        isOpen={isModalOpen}
        closeFn={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BookDashboardPage;
