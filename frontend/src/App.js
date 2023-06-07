import { Fragment } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import ListBooks from "./components/ListBooks";
import ListAuthors from "./components/ListAuthors";
import ListAddress from "./components/ListAddress";
import ListCategory from "./components/ListCategory";
import ListCustomer from "./components/ListCustomer";
import ListStore from "./components/ListStore";
import ListStaff from "./components/ListStaff";
import ListReviews from "./components/ListReviews";
import ListPurchase from "./components/ListPurchases";
import ListPublisher from "./components/ListPublisher";
import ListLanguage from "./components/ListLanguage";
import ListInventory from "./components/ListInventory";

function App() {
  return (
    <Fragment>
      <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen">
        <div className="text-4xl font-bold text-blue my-12 mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-dark-blue">
            {" "}
            Good Reading Bookstore{" "}
          </h1>
        </div>
        <ListBooks />
        <ListCategory />
        <ListLanguage />
        <ListAuthors />
        <ListPublisher />
        <ListReviews />
        <ListInventory />
        <ListAddress />
        <ListCustomer />
        <ListStore />
        <ListStaff />
        <ListPurchase />
      </div>
    </Fragment>
  );
}

export default App;
