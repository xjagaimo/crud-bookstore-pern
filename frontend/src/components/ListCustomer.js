import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableCustomer";
import { Modal } from "./ModalCustomer";

const ListCustomer = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getCustomer = async () => {
      try {
        const response = await fetch("http://localhost:5000/customer");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getCustomer();
    }, []);
  
    console.log(rows);

    const deleteBook = async (customerId) => {
        try {
          await fetch(`http://localhost:5000/customer/${customerId}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.customer_id !== customerId));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editBook = async (customer) => {
    try {
      const response = await fetch(`http://localhost:5000/customer/${customer.customer_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      const updatedBook = await response.json();
      setRows(
        rows.map((row) => (row.customer_id === updatedBook.customer_id ? updatedBook : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addBook = async (newBook) => {
    try {
      const response = await fetch("http://localhost:5000/customer", {
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
  
  const handleDeleteRow = (customerId) => {
    deleteBook(customerId);
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
            <h1 className="font-medium" >Customer</h1>
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

export default ListCustomer;