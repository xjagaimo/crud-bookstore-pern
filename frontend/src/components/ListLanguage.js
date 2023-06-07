import React, { Fragment, useEffect, useState } from "react";

import { Table } from "./TableLanguage";
import { Modal } from "./ModalLanguage";

const ListLanguage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    const getLanguage = async () => {
      try {
        const response = await fetch("http://localhost:5000/language");
        const jsonData = await response.json();
  
        //console.log(jsonData);
        setRows(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getLanguage();
    }, []);
  
    // console.log(rows);

    const deleteLanguage = async (language) => {
      // console.log(language);
        try {
          await fetch(`http://localhost:5000/language/${language}`, {
            method: "DELETE",
          });
          setRows(rows.filter((row) => row.language_id !== language));
        } catch (err) {
          console.error(err.message);
        }
    };

    
  const editLanguage = async (language) => {
    console.log(language);
    try {
      const response = await fetch(`http://localhost:5000/language/${language.language_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(language),
      });
      const updatedLanguage = await response.json();
      setRows(
        rows.map((row) => (row.language_id === updatedLanguage.language_id ? updatedLanguage : row))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);
  
  const addLanguage = async (newLanguage) => {
    try {
      const response = await fetch("http://localhost:5000/language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLanguage),
      });
      const addedLanguage = await response.json();
      setRows([...rows, addedLanguage]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handleDeleteRow = (languageId) => {
    deleteLanguage(languageId);
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? addLanguage(newRow) : editLanguage(newRow);
    setRowToEdit(null);
    setModalOpen(false);
  };

    return (
        <Fragment>
        <div>
            <h1 className="font-medium" >Language</h1>
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

export default ListLanguage;