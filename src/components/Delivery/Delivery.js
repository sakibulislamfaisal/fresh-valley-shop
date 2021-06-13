import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "../Payment/Payment";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const Delivery = ({
  cart,
  deliveryInfo,
  handleDeliveryInfo,
  checkOutProduct,
  handleUserEmail,
  clearCart,
}) => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  console.log("From header Logged In user", loggedInUser);
  console.log("Delivery", cart);
  const stripePromise = loadStripe(
    "pk_test_5u4MdV0k3HrcnkqeNfD3MCIF007tWoO0eL"
  );
  const [paidOrder, setPaidOrder] = useState(null);
  const paidToUser = (paymentInfo) => {
    setPaidOrder(paymentInfo);
  };

  const { name, phone, road, area, address } = deliveryInfo;
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

  const onSubmit = (data) => {
    console.log(data);
    handleDeliveryInfo(data);
    handleUserEmail(loggedInUser.email);
    console.log(data);
  };

  return (
    <div className=" py-5 bg-pink-100 h-100 ">
      <div className="container ">
        <h4 className="text-center">Edit Delivery Detail Info</h4>
        <hr className="border border-danger" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                defaultValue={name}
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
                defaultValue={phone}
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
                defaultValue={road}
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
                defaultValue={area}
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
                defaultValue={address}
                cols="83"
                rows="3"
              />
              {errors.area && (
                <p className="error-form">{errors.area.message}</p>
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
    </div>
  );
};

export default Delivery;
