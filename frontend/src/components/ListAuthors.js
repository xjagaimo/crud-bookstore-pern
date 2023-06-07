import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableAuthor";
import { Modal } from "./ModalAuthor";

const ListAuthors = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getAuthors = async () => {
      try {
        const response = await fetch("http://localhost:5000/author");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getAuthors();
    }, []);
  
    console.log(rows);

    const deleteAuthor = async (authorId) => {
        try {
          await fetch(`http://localhost:5000/author/${authorId}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.author_id !== authorId));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editAuthor = async (author) => {
    try {
      const response = await fetch(`http://localhost:5000/author/${author.author_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
      });
      const updatedAuthor = await response.json();
      setRows(
        rows.map((row) => (row.author_id === updatedAuthor.author_id ? updatedAuthor : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addAuthor = async (newAuthor) => {
    try {
      const response = await fetch("http://localhost:5000/author", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuthor),
      });
      const addedAuthor = await response.json();
      setRows([...rows, addedAuthor]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (authorId) => {
    deleteAuthor(authorId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addAuthor(newRow) : editAuthor(newRow);
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
            <h1 className="font-medium" >Author</h1>
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

export default ListAuthors;