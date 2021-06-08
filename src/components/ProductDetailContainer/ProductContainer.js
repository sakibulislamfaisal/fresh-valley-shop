import React from "react";
import Header from "../Home/Header/Header";
import ProductDetail from "./ProductDetail/ProductDetail";

const ProductContainer = ({cart,addToCartProduct}) => {
  return (
    <div>
      <Header cart={cart} />
      <ProductDetail cart={cart} addToCartProduct={addToCartProduct} ></ProductDetail>
    </div>
  );
};

export default ProductContainer;
