import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const SearchProduct = ({ product, cart, addToCartProduct }) => {
  document.title = "Search Product";
  const { id, name, description, price, img } = product;
  const styles = {
    textDecoration: "none",
    marginLeft: "30px",
    width: "100%",
  };
  const [quantity, setQuantity] = useState(1);
  const [addSingleProduct, setAddSingleProduct] = useState([]);
  // console.log(setQuantity);

  //get single product from database using id
  useEffect(() => {
    fetch(`https://fresh-valley-shop-server.herokuapp.com/singleProduct/${id}`)
      .then((res) => res.json())
      .then((data) => setAddSingleProduct(data))
      .catch((err) => console.log(err));
  }, [id]);
  // console.log("single product", addSingleProduct);

  //handleAddToCart
  const handleCartAdd = (singleProduct) => {
    singleProduct.quantity = quantity;
    addToCartProduct(singleProduct);
    const check_index = cart.findIndex((item) => item.id === singleProduct.id);
    if (check_index !== -1) {
      cart[check_index].quantity++;
      console.log("Quantity updated:", cart);
    }

    // setIsSuccess(true);
    //console.log(singleProduct);
  };

  return (
    <div className="col-xs-12 col-sm-12 col-md-4 mb-3 pb-2 col-container  ">
      <div className="card-deck deck-container ">
        <Link
          to={"/product/product-details/" + id}
          className="navigation-food"
          style={{ textDecoration: "none" }}
        >
          <div className="card border border-success">
            <img src={img} className=" d-block mx-auto" alt="productImage" />
            <div className="card-body">
              <h5 className="card-title text-center text-green-700 hover:text-pink-700 -700 text-xl subpixel-antialiased  font-extra-bold">
                {name}
              </h5>
              {/* <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p> */}
            </div>
            <div className="card-footer">
              <div className="d-flex wrap">
                <h5 className="price text-indigo font-bold">
                  ${Number(price)}
                </h5>
                <NavLink
                  to="/checkout"
                  style={styles}
                  onClick={() => handleCartAdd(addSingleProduct)}
                >
                  <button className=" shopping-btn bg-pink-500 hover:bg-green-700 text-white py-2  mt-1  rounded ">
                    BUY NOW
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchProduct;
