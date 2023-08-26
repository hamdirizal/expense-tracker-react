import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getOwnedBooks } from "../slices/bookSlice";
import { SupabaseContext } from "../main";
import LoadingSpinner from "../components/LoadingSpinner";
import { AjaxState } from "../types";
import CurrentBookPanel from "../components/CurrentBookPanel";
import PageTitle from "../components/PageTitle";
import {
  useGetAuthUserQuery,
  useGetOwnedBooksQuery,
} from "../services/supabase";

const DashboardPage = () => {
  useGetOwnedBooksQuery();

  return (
    <div>
      <PageTitle title="Dashboard" />
      <CurrentBookPanel />
    </div>
  );
};

export default DashboardPage;
