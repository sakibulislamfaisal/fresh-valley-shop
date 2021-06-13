import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Home/Header/Header";
import ProductDetail from "./ProductDetail/ProductDetail";

const ProductContainer = ({cart,addToCartProduct}) => {
  return (
    <div>
      <Header cart={cart} />
      <ProductDetail cart={cart} addToCartProduct={addToCartProduct} ></ProductDetail>
      <Footer></Footer>
    </div>
  );
};

export default ProductContainer;
