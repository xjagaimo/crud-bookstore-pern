import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableStore";
import { Modal } from "./ModalStore";

const ListStore = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getStore = async () => {
      try {
        const response = await fetch("http://localhost:5000/store");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getStore();
    }, []);
  
    // console.log(rows);

    const deleteStore = async (store) => {
      // console.log(store);
        try {
          await fetch(`http://localhost:5000/store/${store}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.store_id !== store));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editStore = async (store) => {
    console.log(store);
    try {
      const response = await fetch(`http://localhost:5000/store/${store.store_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(store),
      });
      const updatedStore = await response.json();
      setRows(
        rows.map((row) => (row.store_id === updatedStore.store_id ? updatedStore : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addStore = async (newStore) => {
    try {
      const response = await fetch("http://localhost:5000/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStore),
      });
      const addedStore = await response.json();
      setRows([...rows, addedStore]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (storeId) => {
    deleteStore(storeId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addStore(newRow) : editStore(newRow);
    setRowToEdit(null);
    setModalOpen(false);
  };

    return (
        <Fragment>
        <div>
            <h1 className="font-medium" >Store</h1>
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

export default ListStore;