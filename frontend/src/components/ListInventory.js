import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableInventory";
import { Modal } from "./ModalInventory";

const ListInventory = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/inventory");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getInventory();
    }, []);
  
    console.log(rows);

    const deleteInventory = async (inventoryId) => {
        try {
          await fetch(`http://localhost:5000/inventory/${inventoryId}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.inventory_id !== inventoryId));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editInventory = async (inventory) => {
    try {
      const response = await fetch(`http://localhost:5000/inventory/${inventory.inventory_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inventory),
      });
      const updatedInventory = await response.json();
      setRows(
        rows.map((row) => (row.inventory_id === updatedInventory.inventory_id ? updatedInventory : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addInventory = async (newInventory) => {
    try {
      const response = await fetch("http://localhost:5000/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInventory),
      });
      const addedInventory = await response.json();
      setRows([...rows, addedInventory]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (inventoryId) => {
    deleteInventory(inventoryId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addInventory(newRow) : editInventory(newRow);
    setRowToEdit(null);
    setModalOpen(false);
  };

    return (
        <Fragment>
        <div>
            <h1 className="font-medium" >Inventory</h1>
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

export default ListInventory;