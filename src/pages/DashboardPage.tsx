import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getOwnedBooks } from "../slices/bookSlice";
import { SupabaseContext } from "../main";
import LoadingSpinner from "../components/LoadingSpinner";
import { AjaxState } from "../types";
import CurrentBookPanel from "../components/CurrentBookPanel";
import PageTitle from "../components/PageTitle";
import { useGetOwnedBooksQuery } from "../services/book";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const supabase = useContext(SupabaseContext);
  const { data, error, isLoading } = useGetOwnedBooksQuery();
  useEffect(() => {
    // dispatch(getOwnedBooks(supabase));
  }, []);

  return (
    <div>
      <div className="border mb-2">{JSON.stringify(error)}</div>
      <div className="border mb-2">{JSON.stringify(isLoading)}</div>
      <PageTitle title="Dashboard" />
      <CurrentBookPanel />
    </div>
  );
};

export default DashboardPage;
