import React, { useState, useEffect } from "react";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState({
    customer_id: "",
    purchase_date: "",
    store_id: "",
    staff_id: "",
    inventory_id: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const { customer_id, purchase_date, store_id, staff_id, inventory_id } = formState;
    if (customer_id && purchase_date && store_id && staff_id && inventory_id) {
      setErrors("");
      return true;
    } else {
      const errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
      onClick={(e) => {
        if (
          e.target.className ===
          "fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
        )
          closeModal();
      }}
    >
      <div className="bg-white p-8 rounded-md w-64">
        <form>
          <div className="flex flex-col mb-4">
            <label htmlFor="customer_id" className="font-semibold">
              Customer ID
            </label>
            <input
              name="customer_id"
              onChange={handleChange}
              value={formState.customer_id}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="purchase_date" className="font-semibold">
              Purchase Date
            </label>
            <input
              name="purchase_date"
              onChange={handleChange}
              value={formState.purchase_date}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="store_id" className="font-semibold">
              store_id
            </label>
            <input
              name="store_id"
              onChange={handleChange}
              value={formState.store_id}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="staff_id" className="font-semibold">
            staff_id
            </label>
            <input
              name="staff_id"
              onChange={handleChange}
              value={formState.staff_id}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="inventory_id" className="font-semibold">
            inventory_id
            </label>
            <input
              name="inventory_id"
              onChange={handleChange}
              value={formState.inventory_id}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button
            type="submit"
            className="mt-4 border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
