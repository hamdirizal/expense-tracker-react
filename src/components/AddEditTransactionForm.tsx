import { useForm } from "react-hook-form";
import Button from "./Button";
import Heading3 from "./Heading3";

const AddEditTransactionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit((data) => onFormSubmitted(data))}
        className="relative"
      >
        <div>Create new book</div>
        <div className="">
          <input
            className="border-2 border-gray-400 mr-3"
            required
            type="date"
            placeholder="Date"
            {...register("date", { required: true })}
          />
          <br />
          <input
            className="border-2 border-gray-400 mr-3"
            required
            type="text"
            placeholder="Transaction title"
            {...register("title", { required: true })}
          />
          <br />
          <input
            className="border-2 border-gray-400 mr-3"
            required
            type="number"
            placeholder="Amount"
            {...register("amount", { required: true })}
          />
          <br />
          <div>
            <label>
              <input type="radio" value="false" {...register("is_outgoing", { required: true })} />
              Incoming
            </label>
            <label>
            <input defaultChecked type="radio" value="true" {...register("is_outgoing", { required: true })} />
              Outgoing
            </label>
          </div>
          <input
            className="border-2 border-gray-400 mr-3"
            type="text"
            placeholder="Description"
            {...register("description")}
          />
          <br />
          <input
            className="border-2 border-gray-400 mr-3"
            type="number"
            placeholder="Book ID"
            required
            {...register("book_id", { required: true })}
          />
          <br />
          <input
            className="border-2 border-gray-400 mr-3"
            type="text"
            placeholder="Creator ID"
            {...register("creator_id", { required: true })}
          />
          <br />
          <div className="w-[200px]">
            <Button
              label="Create transaction"
              variant="primary"
              onClick={() => {}}
              type="submit"
            />
          </div>
        </div>
      </form>
      <br />
      <br />
      <form action="" className="border border-red-500">
        <div className="flex">
          <label>
            <input type="Checkbox" className="mr-2" />
            <span>Delete transaction</span>
          </label>
        </div>
        <p>This action cannot be undone.</p>
        <div>
          <button>Confirm deletion</button>
        </div>
      </form>
    </>
  );
};

export default AddEditTransactionForm;
