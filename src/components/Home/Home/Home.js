import React from "react";
import Banner from "../Banner/Banner";
import Header from "../Header/Header";
import Product from "../Product/Product";
import Footer from "../../Footer/Footer";
const Home = ({ cart, addToCartProduct }) => {
  document.title = "Home Page";
  return (
    <>
      <Header cart={cart}></Header>
      <Banner></Banner>
      <Product cart={cart} addToCartProduct={addToCartProduct}></Product>
      <Footer></Footer>
    </>
  );
};

export default Home;
