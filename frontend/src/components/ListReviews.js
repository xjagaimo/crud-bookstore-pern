import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableReview";
import { Modal } from "./ModalReview";

const ListReviews = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getReview = async () => {
      try {
        const response = await fetch("http://localhost:5000/review");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getReview();
    }, []);
  
    console.log(rows);

    const deleteReview = async (reviewId) => {
        try {
          await fetch(`http://localhost:5000/review/${reviewId}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.review_id !== reviewId));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editReview = async (review) => {
    try {
      const response = await fetch(`http://localhost:5000/review/${review.review_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
      const updatedReview = await response.json();
      setRows(
        rows.map((row) => (row.review_id === updatedReview.review_id ? updatedReview : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addReview = async (newReview) => {
    try {
      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });
      const addedReview = await response.json();
      setRows([...rows, addedReview]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (reviewId) => {
    deleteReview(reviewId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addReview(newRow) : editReview(newRow);
    setRowToEdit(null);
    setModalOpen(false);
  };

    return (
        <Fragment>
        <div>
            <h1 className="font-medium" >Review</h1>
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

export default ListReviews;