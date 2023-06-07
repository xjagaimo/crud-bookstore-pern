import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableStaff";
import { Modal } from "./ModalStaff";

const ListStaff = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getStaff = async () => {
      try {
        const response = await fetch("http://localhost:5000/staff");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getStaff();
    }, []);
  
    // console.log(rows);

    const deleteStaff = async (staff) => {
      // console.log(staff);
        try {
          await fetch(`http://localhost:5000/staff/${staff}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.staff_id !== staff));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editStaff = async (staff) => {
    //console.log(staff);
    try {
      const response = await fetch(`http://localhost:5000/staff/${staff.staff_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staff),
      });
      const updatedStaff = await response.json();
      setRows(
        rows.map((row) => (row.staff_id === updatedStaff.staff_id ? updatedStaff : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addStaff = async (newStaff) => {
    try {
      const response = await fetch("http://localhost:5000/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStaff),
      });
      const addedStaff = await response.json();
      setRows([...rows, addedStaff]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (staffId) => {
    deleteStaff(staffId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addStaff(newRow) : editStaff(newRow);
    setRowToEdit(null);
    setModalOpen(false);
  };

    return (
        <Fragment>
        <div>
            <h1 className="font-medium" >Staff</h1>
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

export default ListStaff;