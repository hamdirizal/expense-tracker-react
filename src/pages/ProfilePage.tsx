import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getStoredDefaultBookId, logout } from "../helpers/storageHelper";
import { AppPaths } from "../constants";
import CurrentBookPanel from "../components/CurrentBookPanel";
import ModalSelectBook from "../components/ModalSelectBook";
import CreateBookForm from "../components/CreateBookForm";
import BookList from "../components/BookList";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import useGetCollaboratedBooksQuery from "../services/useGetCollaboratedBooksQuery";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import SgvArrowLeftIcon from "../svg-components/SgvArrowLeftIcon";

const ProfilePage = () => {
  const getAuthUserQuery = useGetAuthUserQuery();

  const renderIfLoggedIn = () => {
    return (
      <div>
        <Link className="Back" to={AppPaths.BOOK_WELCOME}>
          <span className="Back__icon">
            <SgvArrowLeftIcon color="#0040ff" />
          </span>
          Back to the book selection
        </Link>
        <div className="HSpace2"></div>

        <div className="Heading3">My Account</div>
        <div>
          Logged-in as: <u>{getAuthUserQuery?.data?.email}</u>
        </div>
        <div className="HSpaceHalf"></div>
        <button
          onClick={() => {
            logout();
          }}
          className="ButtonRegular"
        >
          Logout
        </button>
        <div className="HSpace1"></div>
        <div className="Heading3">Edit Basic Info</div>
        <div>Edit profile form</div>
        <div className="HSpace1"></div>
        <div className="Heading3">Change Password</div>
        <div>Change password form</div>
        <div className="HSpace1"></div>
        <div className="Heading3">Delete Account</div>
        <div>Delete profile form</div>
      </div>
    );
  };

  return getAuthUserQuery?.data ? renderIfLoggedIn() : null;
};

export default ProfilePage;
