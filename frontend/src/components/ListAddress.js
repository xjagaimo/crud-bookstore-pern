import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableAddress";
import { Modal } from "./ModalAddress";

const ListAddress = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getAddress = async () => {
      try {
        const response = await fetch("http://localhost:5000/address");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getAddress();
    }, []);
  
    // console.log(rows);

    const deleteAddress = async (address) => {
      // console.log(address);
        try {
          await fetch(`http://localhost:5000/address/${address}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.address_id !== address));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editAddress = async (address) => {
    //console.log(address);
    try {
      const response = await fetch(`http://localhost:5000/address/${address.address_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });
      const updatedAddress = await response.json();
      setRows(
        rows.map((row) => (row.address_id === updatedAddress.address_id ? updatedAddress : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addAddress = async (newAddress) => {
    try {
      const response = await fetch("http://localhost:5000/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      });
      const addedAddress = await response.json();
      setRows([...rows, addedAddress]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (addressId) => {
    deleteAddress(addressId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addAddress(newRow) : editAddress(newRow);
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
            <h1 className="font-medium" >Address</h1>
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

export default ListAddress;