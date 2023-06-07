import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TablePurchase";
import { Modal } from "./ModalPurchase";

const ListPurchase = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getPurchase = async () => {
      try {
        const response = await fetch("http://localhost:5000/purchase");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getPurchase();
    }, []);
  
    // console.log(rows);

    const deletePurchase = async (purchase) => {
      // console.log(purchase);
        try {
          await fetch(`http://localhost:5000/purchase/${purchase}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.purchase_id !== purchase));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editPurchase = async (purchase) => {
    //console.log(purchase);
    try {
      const response = await fetch(`http://localhost:5000/purchase/${purchase.purchase_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchase),
      });
      const updatedPurchase = await response.json();
      setRows(
        rows.map((row) => (row.purchase_id === updatedPurchase.purchase_id ? updatedPurchase : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addPurchase = async (newPurchase) => {
    try {
      const response = await fetch("http://localhost:5000/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPurchase),
      });
      const addedPurchase = await response.json();
      setRows([...rows, addedPurchase]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (purchaseId) => {
    deletePurchase(purchaseId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addPurchase(newRow) : editPurchase(newRow);
    setRowToEdit(null);
    setModalOpen(false);
  };

    return (
        <Fragment>
        <div>
            <h1 className="font-medium" >Purchase</h1>
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

export default ListPurchase;