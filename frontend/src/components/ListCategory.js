import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableCategory";
import { Modal } from "./ModalCategory";

const ListCategory = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getCategory = async () => {
      try {
        const response = await fetch("http://localhost:5000/category");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getCategory();
    }, []);
  

    const deleteCategory = async (id) => {
        try {
          await fetch(`http://localhost:5000/category/${id}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.category_id !== id));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editCategory = async (category) => {
    //console.log(category);
    try {
      const response = await fetch(`http://localhost:5000/category/${category.category_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      const updatedCategory = await response.json();
      //console.log(updatedCategory)
      setRows(
        rows.map((row) => (row.category_id === updatedCategory.category_id ? updatedCategory : row))
      );

    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addCategory = async (newCategory) => {
    try {
      const response = await fetch("http://localhost:5000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      const addedCategory = await response.json();
      setRows([...rows, addedCategory]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = id => {
    deleteCategory(id);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addCategory(newRow) : editCategory(newRow);
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
            <h1 className="font-medium" >Category</h1>
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

export default ListCategory;