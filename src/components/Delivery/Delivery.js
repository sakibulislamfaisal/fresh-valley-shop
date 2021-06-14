import React, { useContext, useState } from "react";
import Payment from "../Payment/Payment";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import swal from "sweetalert";

const Delivery = ({ cart, removeAllCart }) => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),

    phone: Yup.number()
      .positive()
      .integer()
      .required("Phone Number is required!"),
    road: Yup.string().required("Road Number is required!"),
    area: Yup.string().required("Area is required!"),
    address: Yup.string().required("Address is required!"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  //cart calculation
  // const total = cart.reduce((total,product) => total + product.price ,0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const element = cart[i];
    total = total + element.price * element.quantity;
  }

  let shipping = 0;
  if (total > 35) {
    shipping = 4.44;
  } else if (total > 15) {
    shipping = 8.88;
  } else if (total > 0) {
    shipping = 12.99;
  }

  const tax = Math.ceil(total / 10);
  const grandTotals = (total + shipping + tax).toFixed(2);
  const grandTotal = Number(grandTotals);

  const onSubmit = (data) => {
    setShipInfo(data);
  };

  //const newCart = Object.setPrototypeOf(cart, Object.prototype);

  const handlePlaceOrder = (payment) => {
    const orderDetail = {
      email: loggedInUser.email,
      cart: cart,
      name: loggedInUser.username || loggedInUser.displayName,
      shipment: shipInfo,
      payment: payment,
      creation: new Date().toDateString(),
    };
    //console.log(data)
    fetch("https://fresh-valley-shop-server.herokuapp.com/submit-order", {
      method: "POST",
      body: JSON.stringify(orderDetail),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((order) => {
        setOrderId(order._id);
        swal("Good job!", "Your Payment is Successful", "success", {
          button: "Thank You ",
        });
        removeAllCart();
        console.log(order);
        //  alert('Order Placed Successfully by Order Id is  : ' + order._id);
      });
  };

  return (
    <div className=" py-5 bg-pink-100 h-100 ">
      <div className="container ">
        {/* <!--deliveryInfo start--> */}
        <div className="row">
          <div style={{ display: shipInfo && "none" }} className="col-md-6">
            <h4 className="text-center">Edit Delivery Detail Info</h4>
            <hr className="border border-danger" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    {...register("name")}
                    className="placeholder-pink-700  "
                    placeholder="Enter Your Name"
                  />
                  {errors.name && (
                    <p className="error-form">{errors.name.message}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    {...register("phone")}
                    className="placeholder-pink-700  "
                    placeholder="Enter Your Phone Number"
                  />
                  {errors.phone && (
                    <p className="error-form">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div>
                  <label>Road Number</label>
                  <input
                    type="text"
                    name="road"
                    {...register("road")}
                    className="placeholder-pink-700  "
                    placeholder="Enter Your Road Number"
                  />
                  {errors.road && (
                    <p className="error-form">{errors.road.message}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div>
                  <label>Area</label>
                  <input
                    type="text"
                    name="area"
                    {...register("area")}
                    className="placeholder-pink-700  "
                    placeholder="Enter Your Area"
                  />
                  {errors.area && (
                    <p className="error-form">{errors.area.message}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div>
                  <label>Address</label>
                  <textarea
                    type="text"
                    name="address"
                    {...register("address")}
                    className="placeholder-pink-700  "
                    placeholder="Enter Your Address"
                    cols="70"
                    rows="3"
                  />
                  {errors.area && (
                    <p className="error-form">{errors.address.message}</p>
                  )}
                </div>
              </div>
              <div className="form-group">
                <button className="bg-pink-700 hover:bg-indigo-500 text-white py-3 px-4  mt-3  rounded cart-add">
                  Save & Continue
                </button>
              </div>
            </form>
          </div>
          <div
            className="col-md-6"
            style={{ display: shipInfo ? "block" : "none" }}
          >
            <h4 className="text-center">Payment to Checkout</h4>
            <hr className="border border-danger" />
            <Payment handlePlaceOrder={handlePlaceOrder}></Payment>
          </div>

          {cart.length ? (
            <div className="col-xs-12 col-sm-12 col-md-6 text-center">
              <h4 className="text-center font-bold">Your Cart Info</h4>
              <hr className="border border-success" />
              <h6 className="text-center font-bold text-purple-700">
                Items Ordered : {cart.length}
              </h6>
              <h6 className="text-center font-bold text-purple-700">
                Product Cost : {total}
              </h6>
              <h6 className="text-center font-bold text-purple-700">
                Shipping Charge : {shipping}
              </h6>
              <h6 className="text-center font-bold text-purple-700">
                Tax + VAT : {tax}.00
              </h6>

              <hr className="border border-success w-50 font-bold d-block mx-auto" />
              <h5 className="text-center font-bold text-green-700">
                Total Price : {grandTotal}
              </h5>
              {/* {cart.map((cartElement) => {
              return (
                <div key={cartElement.id} className="text-center">
                  <p>{cartElement.price}</p>
                </div>
              );
            })} */}
            </div>
          ) : (
            <div
              className="col-xs-12 col-sm-12 col-md-6 text-center"
              // style={{ display: cart.length < 0 ? "none" : "block" }}
            >
              <h4 className="text-center font-bold">Your Cart Info</h4>
              <hr className="border border-success" />

              <h3 className="font-bold text-pink-600">
                You have no products in your cart.
              </h3>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className=" bg-green-500 hover:bg-purple-700 w-40 text-white py-2 px-3    text-xl mt-1  rounded ">
                  Go to home
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* <!--deliveryInfo done--> */}
      </div>
    </div>
  );
};

export default Delivery;
