import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableBook";
import { Modal } from "./ModalBook";

const ListBooks = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getBook = async () => {
      try {
        const response = await fetch("http://localhost:5000/book");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getBook();
    }, []);
  
    console.log(rows);

    const deleteBook = async (bookId) => {
        try {
          await fetch(`http://localhost:5000/book/${bookId}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.book_id !== bookId));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editBook = async (book) => {
    try {
      const response = await fetch(`http://localhost:5000/book/${book.book_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      const updatedBook = await response.json();
      setRows(
        rows.map((row) => (row.book_id === updatedBook.book_id ? updatedBook : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addBook = async (newBook) => {
    try {
      const response = await fetch("http://localhost:5000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      const addedBook = await response.json();
      setRows([...rows, addedBook]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (bookId) => {
    deleteBook(bookId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addBook(newRow) : editBook(newRow);
    setRowToEdit(null);
    setModalOpen(false);
  };

    // const handleDeleteRow = (targetIndex) => {
    //   setRows(rows.filter((_, index) => index !== targetIndex));
    // };
  
    // const handleEditRow = (index) => {
    //   setRowToEdit(index);
  
    //   setModalOpen(true);
    // };
  
    // const handleSubmit = (newRow) => {
    //   rowToEdit === null
    //     ? setRows([...rows, newRow])
    //     : setRows(
    //         rows.map((currRow, index) => {
    //           if (index !== rowToEdit) return currRow;
  
    //           return newRow;
    //         })
    //       );
    // };

    return (
        <Fragment>
        <div>
            <h1 className="font-medium" >Book</h1>
          <Table
            rows={rows}
            deleteRow={handleDeleteRow}
            editRow={handleEditRow}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 mx-auto border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
          >
            Add
          </button>
          {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={handleSubmit}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
            />
          )}
        </div>
        </Fragment>
    )
};

export default ListBooks;