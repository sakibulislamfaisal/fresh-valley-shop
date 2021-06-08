import React from "react";
import data from "./Data";

const AddToDatabase = () => {
  const postData = (url, data) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container py-5 mt-5 text-center">
      <h3 className="text-center">Database Management</h3>
      <hr className="border border-danger" />
      <button
        onClick={() => postData("http://localhost:5200/add-products", data)}
        className="btn btn-secondary px-4 "
      >
        Add Product
      </button>
    </div>
  );
};

export default AddToDatabase;
