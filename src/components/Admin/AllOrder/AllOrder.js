import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const AllOrder = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5200/all-orders")
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

  const removeSingleProduct = (id) => {
    const removeItem = order.filter((p) => p.id !== id);
    setOrder(removeItem);
  };

  return (
    <div>
      <h3 className="text-center mb-4 underline">All Orders</h3>
      <Table responsive bordered striped hover>
                <thead>
                  <tr className="text-center hover:text-indigo-700">
                    <th>No</th>
                    <th>email</th>
                    <th>PaymentId</th>

                    <th>Address</th>
                    <th>Phone</th>
                    <th>Name</th>
                    <th>Creation</th>
                  </tr>
                </thead>

                <tbody>
                  {order.map((product, index) => {
                    console.log(product);
                    return (
                      <tr className="text-center" key={product.id}>
                        <td
                          className="text-center align-middle"
                          key={product.id}
                        >
                          {index + 1}
                        </td>

                        <td className="align-middle">{product.email}</td>
                        <td className="align-middle">{product.payment.id}</td>

                        <td className="align-middle">
                          {product.shipment.address}
                        </td>
                        <td className="align-middle">
                          {product.shipment.phone}
                        </td>
                        <td className="align-middle">
                          {product.shipment.name}
                        </td>
                        <td className="align-middle">{product.creation}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
    </div>
  );
};

export default AllOrder;
