import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { userContext } from "../../App";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  useEffect(() => {
    fetch(
      "https://fresh-valley-shop-server.herokuapp.com/orders?email=" + sessionStorage.getItem("email")
    )
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);
  console.log("orders", order);
  return (
    <div className="order-container">
      <h3 className="font-bold text-indigo-700 text-center uppercase underline mt-3">
        Your Order History
      </h3>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            {sessionStorage.getItem("email") && order && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
