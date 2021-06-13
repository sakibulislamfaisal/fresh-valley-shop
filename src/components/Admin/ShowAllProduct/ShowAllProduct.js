import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const ShowAllProduct = () => {
  const [allPrd, setAllPrd] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5200/products")
      .then((res) => res.json())
      .then((data) => setAllPrd(data));
  }, []);

  const removeSingleProduct = (id) => {
    const removeItem = allPrd.filter((p) => p.id !== id);
    setAllPrd(removeItem);
  };

  return (
    <div>
      <h3 className="text-center mb-4 underline">All Product</h3>
      <Table responsive bordered striped hover>
        <thead>
          <tr className="text-center hover:text-indigo-700">
            <th>No</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Product Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allPrd.map((product, index) => {
            return (
              <tr className="text-center" key={product.id}>
                <td className="text-center align-middle" key={product.id}>
                  {index + 1}
                </td>
                <td className="d-block mx-auto">
                  <img
                    src={product.img}
                    className="w-20  h-15 d-block mx-auto"
                    alt=""
                  />
                </td>
                <td className="align-middle">{product.name}</td>
                <td className="align-middle">{product.category}</td>

                <td className="align-middle">${Number(product.price)}</td>
                <td className="align-middle">
                  <FontAwesomeIcon
                    onClick={() => removeSingleProduct(product.id)}
                    className="text-pink-500 text-xl cursor-pointer"
                    icon={faTrash}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ShowAllProduct;
