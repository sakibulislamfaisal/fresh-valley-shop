import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Checkout.css";

const Checkout = ({ cart, removeAllCart, removeSingleProduct }) => {
  console.log("from checkout page", cart);
  const [update, setUpdate] = useState();
  const [updatePrice, setUpdatePrice] = useState();
  const price = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log(Number(price));

  // console.log(grandTotal);
  const styleCheckoutButton = {
    textDecoration: "none",
  };
  return (
    <section className="check-out py-5 my-5">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <h2 className="text-indigo-500 mb-5">Checkout Your Product :</h2>
            <Table responsive bordered striped hover>
              <thead>
                <tr className="text-center hover:text-indigo-700">
                  <th>No</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Product Quantity</th>
                  <th>Product Category</th>
                  <th>Product Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((product, index) => {
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
                      <td className="align-middle">
                        {" "}
                        <div className=" ml-4">
                          <button
                            className="mr-4 text-2xl text-green-700 font-bold"
                            onClick={() => setUpdate((product.quantity += 1))}
                          >
                            +
                          </button>
                          {product.quantity}
                          <button
                            className=" ml-4 text-2xl text-pink-700 font-bold"
                            onClick={() => setUpdate((product.quantity -= 1))}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td className="align-middle">${product.price}</td>
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
            <div className="total-item flex ">
              <h5 className="text-2xl mt-1">Total</h5>
              <h5 className="prices">= ${price}</h5>
            </div>
            <div className="checkout-section-area flex">
              <Link to="/checkout" style={styleCheckoutButton}>
                <button className="checkout-btn bg-green-500 hover:bg-pink-700 w-30 text-white py-2 px-3    text-xl mt-1  rounded ">
                  Checkout
                </button>
              </Link>

              <button
                onClick={() => removeAllCart()}
                className="bg-indigo-500 hover:bg-pink-700 w-30 text-white py-2 px-3    text-xl mt-1  rounded empty-btn "
              >
                Remove Carts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
