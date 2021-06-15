import {
  faCheckCircle,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetail.css";
// import AddToDatabase from "../../../Data/AddToDatabase";
const ProductDetail = ({ cart, addToCartProduct }) => {
  document.title = "Product Detail";
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [allPrd, setAllPrd] = useState([]);
  // console.log(id);
  const [quantity, setQuantity] = useState(1);

  // useEffect(() => {
  //   fetch(`http://localhost:5200/products`)
  //     .then((res) => res.json())
  //     .then((data) => setAllPrd(data))
  //     .catch((err) => console.log(err));
  // }, []);

  // const { _id } = allPrd;
  // console.log(_id);

  //get single product from database using id
  useEffect(() => {
    fetch(`https://fresh-valley-shop-server.herokuapp.com/singleProduct/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleProduct(data))
      .catch((err) => console.log(err));
  }, [id]);
  //console.log(singleProduct);
  const { name, description, price, img } = singleProduct;
  //const price = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //handleAddToCart
  const handleCartAdd = (singleProduct) => {
    singleProduct.quantity = quantity;
    addToCartProduct(singleProduct);
    const check_index = cart.findIndex((item) => item.id === singleProduct.id);
    if (check_index !== -1) {
      cart[check_index].quantity++;
      console.log("Quantity updated:", cart);
    }
  };

  //success message
  if (isSuccess) {
    setTimeout(() => setIsSuccess(false), 3000);
  }
  return (
    <div className="food-detail py-4 my-4 container">
      {/* <AddToDatabase /> */}
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 py-5 my-5 ">
          <h1 className="mb-2 text-purple-700">{name}</h1>
          <p className="mb=0">{description}</p>
          <div className="d-flex mt-4">
            <h2 className="mt-2 text-green-800">
              Product Price : {Number(price)}
            </h2>

            <div className="cart-add-food py-5 ">
              <button
                className="bg-green-700 hover:bg-pink-700 text-white py-3 px-4  mt-3  rounded cart-add"
                onClick={() => handleCartAdd(singleProduct)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart
              </button>
              <br />

              {isSuccess && (
                <p className=" success-msg text-purple-500 font-bold font-2xl">
                  <FontAwesomeIcon icon={faCheckCircle} /> Food Added
                  Successfully To Cart
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 show-right-image ">
          <img className="img-single img-fluid" src={img} alt="SingleImage" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
