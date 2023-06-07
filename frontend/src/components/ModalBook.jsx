import React, { useState, useEffect } from "react";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState({
    book_name: "",
    book_isbn: "",
    price: "",
    book_desc: "",
    publication_year: "",
    pages: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const { book_name, book_isbn, price, book_desc, publication_year, pages } = formState;
    if (book_name && book_isbn && price && book_desc && publication_year && pages) {
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
            <label htmlFor="book_name" className="font-semibold">
              Title
            </label>
            <input
              name="book_name"
              onChange={handleChange}
              value={formState.book_name}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="book_isbn" className="font-semibold">
              ISBN
            </label>
            <input
              name="book_isbn"
              onChange={handleChange}
              value={formState.book_isbn}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="price" className="font-semibold">
              Price
            </label>
            <input
              name="price"
              onChange={handleChange}
              value={formState.price}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="book_desc" className="font-semibold">
              Description
            </label>
            <textarea
              name="book_desc"
              onChange={handleChange}
              value={formState.book_desc}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="publication_year" className="font-semibold">
              publication_year
            </label>
            {/* <select */}
            <input
              name="publication_year"
              onChange={handleChange}
              value={formState.publication_year}
              className="border border-black rounded-md p-1 text-base"
            />
            {/* >
              <option value="active">Active</option>
              <option value="nonactive">Non Active</option>
              <option value="nothing">Nothing</option>
            </select> */}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="pages" className="font-semibold">
              pages
            </label>
            <input
              name="pages"
              onChange={handleChange}
              value={formState.pages}
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
