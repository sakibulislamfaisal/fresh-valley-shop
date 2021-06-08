import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Header from "./components/Home/Header/Header";
import Home from "./components/Home/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import ProductContainer from "./components/ProductDetailContainer/ProductContainer";

function App() {
  const [cart, setCart] = useState([]);

  //add to cart foods
  const addToCartProduct = (data) => {
    const isAddedAlready = cart.find((pd) => pd.id === data.id);
    const newCart = [...cart, data];
    if (!isAddedAlready) {
      setCart(newCart);
    }
  };
  // console.log(cart);

  //remove all cart
  const removeAllCart = () => {
    setCart([]);
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home cart={cart} addToCartProduct={addToCartProduct} />
          </Route>
          <Route path="/product/product-details/:id">
            <ProductContainer cart={cart} addToCartProduct={addToCartProduct} />
          </Route>
          <Route path="/checkout">
            <Header cart={cart}></Header>
            <Checkout cart={cart} removeAllCart={removeAllCart} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
