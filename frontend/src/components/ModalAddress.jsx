import React, { useState, useEffect } from "react";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState({
    address: "",
    city: "", 
    country: "", 
    postal_code: ""
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const { address, city, country, postal_code } = formState;
    if (address && city && country && postal_code) {
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
            <label htmlFor="address" className="font-semibold">
              Address
            </label>
            <input
              name="address"
              onChange={handleChange}
              value={formState.address}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="city" className="font-semibold">
              city
            </label>
            <input
              name="city"
              onChange={handleChange}
              value={formState.city}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="country" className="font-semibold">
              country
            </label>
            <input
              name="country"
              onChange={handleChange}
              value={formState.country}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="postal_code" className="font-semibold">
              postal_code
            </label>
            <textarea
              name="postal_code"
              onChange={handleChange}
              value={formState.postal_code}
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
