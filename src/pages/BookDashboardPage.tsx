import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGetSingleBookQuery from "../services/useGetSingleBookQuery";
import ErrorDiv from "../components/ErrorDiv";
import useGetRecentTransactionsQuery from "../services/useGetRecentTransactionsQuery";
import ModalSelectBook from "../components/ModalSelectBook";
import { AppPaths } from "../constants";
import Heading3 from "../components/Heading3";
import CurrentBookLine from "../components/CurrentBookLine";

const BookDashboardPage = () => {
  const { book_id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSingleBookQuery = useGetSingleBookQuery(parseInt(book_id || "0"));

  const getRecentTransactionsQuery = useGetRecentTransactionsQuery(
    parseInt(book_id || "0")
  );

  const renderPageContent = () => {
    return (
      <>
        <div>
          <CurrentBookLine
            title={getSingleBookQuery.data?.title || ""}
            onSwitch={() => setIsModalOpen(true)}
          />
        </div>
        <div>
          {getSingleBookQuery.data ? (
            <div className="text-white-text">
              <span className="font-bold">{getSingleBookQuery.data.title}</span>{" "}
              <button
                className="border my-2"
                onClick={() => setIsModalOpen(true)}
              >
                (switch book)
              </button>
            </div>
          ) : null}

          <button className="border my-2" onClick={() => setIsModalOpen(true)}>
            (click here to switch)
          </button>
        </div>
        <hr />
        <div className="rounded border my-4 p-6">
          <div className="grid grid-cols-3 text-center">
            <div>
              <div>Today</div>
              <div>2000000</div>
              <div>2000000</div>
            </div>
            <div>
              <div>This month</div>
              <div>2000000</div>
              <div>2000000</div>
            </div>
            <div>
              <div>This year</div>
              <div>2000000</div>
              <div>2000000</div>
            </div>
          </div>
        </div>
        <hr />
        <div>{JSON.stringify(getSingleBookQuery.data)}</div>
        <hr />
        {book_id ? (
          <Link to={AppPaths.ADD_TRANSACTION.replace(/:book_id/g, book_id)}>
            Add transactionx
          </Link>
        ) : null}
        <hr />
        <div>Listing</div>
        <hr />
        <div>SEarch</div>
        {book_id ? (
          <div className="my-2">
            <Link
              className="border"
              to={AppPaths.BOOK_MANAGE.replace(/:book_id/g, book_id.toString())}
            >
              Manage book
            </Link>
          </div>
        ) : null}
        <hr />
        <hr />
        <div>Recently added transactions:</div>
        <div>{JSON.stringify(getRecentTransactionsQuery.data)}</div>
        <hr />
      </>
    );
  };

  return (
    <div data-testid="BookDashboardpage">
      {getSingleBookQuery.data ? renderPageContent() : null}
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
