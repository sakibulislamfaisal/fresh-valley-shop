import React from "react";
import Banner from "../Banner/Banner";
import Header from "../Header/Header";
import Product from "../Product/Product";

const Home = ({cart,addToCartProduct}) => {
  return (
    <>
      <Header cart={cart}></Header>
      <Banner></Banner>
      <Product cart={cart}  addToCartProduct={addToCartProduct}></Product>
    </>
  );
};

export default Home;
