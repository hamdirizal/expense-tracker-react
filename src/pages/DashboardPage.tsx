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
  useCreateBookQuery,
  useGetOwnedBooksQuery,
} from "../services/supabase";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const supabase = useContext(SupabaseContext);
  useGetOwnedBooksQuery();
  useEffect(() => {
    // dispatch(getOwnedBooks(supabase));
  }, []);

  return (
    <div>
      <PageTitle title="Dashboard" />
      <CurrentBookPanel />
    </div>
  );
};

export default DashboardPage;
