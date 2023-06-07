import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TablePublisher";
import { Modal } from "./ModalPublisher";

const ListPublisher = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getPublisher = async () => {
      try {
        const response = await fetch("http://localhost:5000/publisher");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getPublisher();
    }, []);
  
    // console.log(rows);

    const deletePublisher = async (publisher) => {
      // console.log(publisher);
        try {
          await fetch(`http://localhost:5000/publisher/${publisher}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.publisher_id !== publisher));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editPublisher = async (publisher) => {
    //console.log(publisher);
    try {
      const response = await fetch(`http://localhost:5000/publisher/${publisher.publisher_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(publisher),
      });
      const updatedPublisher = await response.json();
      setRows(
        rows.map((row) => (row.publisher_id === updatedPublisher.publisher_id ? updatedPublisher : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addPublisher = async (newPublisher) => {
    try {
      const response = await fetch("http://localhost:5000/publisher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPublisher),
      });
      const addedPublisher = await response.json();
      setRows([...rows, addedPublisher]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (publisherId) => {
    deletePublisher(publisherId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addPublisher(newRow) : editPublisher(newRow);
    setRowToEdit(null);
    setModalOpen(false);
  };

    return (
        <Fragment>
        <div>
            <h1 className="font-medium" >Publisher</h1>
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

export default ListPublisher;