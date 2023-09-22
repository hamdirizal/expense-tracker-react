import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Texts } from "../constants/texts";
import useCreateBookMutation from "../services/useCreateBookMutation";
import useGetAuthUserQuery from "../services/useGetAuthUserQuery";
import useInviteSomeoneMutation from "../services/useInviteSomeoneMutation";
import LoadingSpinner from "./LoadingSpinner";

const SendInvitationForm = () => {
  const getAuthUserQuery = useGetAuthUserQuery();
  const inviteSomeoneMutation = useInviteSomeoneMutation();
  const {book_id} = useParams();

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    if (getAuthUserQuery?.data?.uid) {
      inviteSomeoneMutation.mutate({
        email: data.email,
        book_uid: parseInt(book_id || "0"),
      });
    }
  };

  useEffect(() => {
    if (inviteSomeoneMutation.isSuccess) {
      setValue("email", "");
    }
  }, [inviteSomeoneMutation]);

  const renderFormMarkup = () => {
    return (
      <form
        action=""
        onSubmit={handleSubmit((data) => onFormSubmitted(data))}
        className="SendInvitationForm__form"
      >
        <input
          className="InputText SendInvitationForm__input"
          required
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <button type="submit" className="ButtonRegular SendInvitationForm__button">
          Invite
        </button>
      </form>
    );
  };

  return (
    <div className="SendInvitationForm">
      {inviteSomeoneMutation.isLoading ? (
        <LoadingSpinner />
      ) : (
        renderFormMarkup()
      )}
    </div>
  );
};

export default SendInvitationForm;
