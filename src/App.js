import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Header from "./components/Home/Header/Header";
import Home from "./components/Home/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import NotFound from "./components/NotFound/NotFound";
import ProductContainer from "./components/ProductDetailContainer/ProductContainer";
import Navigation from "./components/Admin/Navigation/Navigation";
import AddProduct from "./components/Admin/AddProduct/AddProduct";
import ShowAllProduct from "./components/Admin/ShowAllProduct/ShowAllProduct";
import Delivery from "./components/Delivery/Delivery";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Banner from "./components/Home/Banner/Banner";
import SearchItemResult from "./components/SearchItemResult/SearchItemResult";
import Footer from "./components/Footer/Footer";
import Welcome from "./components/Admin/WelCome/Welcome";
import Order from "./components/Order/Order";
export const userContext = createContext();

//get localStorage items
const getLocalStorageItems = () => {
  let items = localStorage.getItem("cart");
  //console.log(items);
  if (items) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

// const getSessionStorageItems = () => {
//   let userToken = sessionStorage.getItem("token");
//   console.log(userToken);
//   if (userToken) {
//     return JSON.parse(sessionStorage.getItem("token"));
//   } else {
//     return {};
//   }
// };

function App() {
  const [cart, setCart] = useState(getLocalStorageItems());
  const [loggedInUser, setLoggedInUser] = useState({});
  //console.log(loggedInUser);

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

  //remove single Product from carts
  const removeSingleProduct = (id) => {
    const cartItem = cart.filter((item) => item.id !== id);
    setCart(cartItem);
  };

  //cart item add to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //verify users  to SessionStorage
  // useEffect(() => {
  //   sessionStorage.setItem("users", JSON.stringify(loggedInUser));
  // }, [loggedInUser]);

  // delivery product with information just four step
  //1. delivery info send first
  // const [deliveryInfo, setDeliveryInfo] = useState({});

  // const handleDeliveryInfo = (data) => {
  //   setDeliveryInfo(data);
  // };

  // //2.check which user request to delivery product
  // const [userEmail, setUserEmail] = useState(null);

  // const handleUserEmail = (email) => {
  //   setUserEmail(email);
  // };

  // //checkout the product with
  // const checkOutProduct = (productId, productQuantity) => {
  //   const newCart = cart.map((item) => {
  //     if (item.id === productId) {
  //       item.quantity = productQuantity;
  //     }
  //     return item;
  //   });

  //   const filteredCart = newCart.filter((item) => item.quantity > 0);
  //   setCart(filteredCart);
  // };
  // //order products to
  // const [orderId, setOrderId] = useState(null);
  // const clearCart = () => {
  //   const orderedItems = cart.map((cartItem) => {
  //     return {
  //       productName: cartItem.name,
  //       productId: cartItem.id,
  //       quantity: cartItem.quantity,
  //     };
  //   });

  //   console.log(userEmail, orderedItems, deliveryInfo);

  //   const orderDetailsData = { userEmail, orderedItems, deliveryInfo };
  //   fetch("http://localhost:5200/submit-order", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(orderDetailsData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  //   // console.log(orderId);

  //   setCart([]);
  // };
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home cart={cart} addToCartProduct={addToCartProduct} />
          </Route>

          <Route path="/search/:searchItem">
            <Header cart={cart}></Header>
            <Banner></Banner>
            <SearchItemResult
              cart={cart}
              addToCartProduct={addToCartProduct}
            ></SearchItemResult>
            <Footer />
          </Route>
          <Route path="/product/product-details/:id">
            <ProductContainer cart={cart} addToCartProduct={addToCartProduct} />
          </Route>
          <Route path="/checkout">
            <Header cart={cart}></Header>
            <Checkout
              cart={cart}
              removeAllCart={removeAllCart}
              removeSingleProduct={removeSingleProduct}
            />
            <Footer />
          </Route>
          <PrivateRoute path="/delivery">
            <Header cart={cart} />
            <Delivery
              cart={cart}
              removeAllCart={removeAllCart}
              // deliveryInfo={deliveryInfo}
              // handleDeliveryInfo={handleDeliveryInfo}
              // handleUserEmail={handleUserEmail}
              // checkOutProduct={checkOutProduct}
              // clearCart={clearCart}
            />
            <Footer />
          </PrivateRoute>
          <Route path="/orders">
            <Header cart={cart}></Header>
            <Order></Order>
            <Footer/>
          </Route>
          <Route path="/signup">
            <Header cart={cart} />
            <SignUp />
            <Footer />
          </Route>
          <Route path="/login">
            <Header cart={cart} />
            <Login />
            <Footer />
          </Route>
          <Route path="/admin">
            <Navigation />
            <Welcome />
          </Route>

          <Route path="/add-products">
            <Navigation />
            <AddProduct />
            <Footer />
          </Route>
          <Route path="/all-products">
            <Navigation />
            <ShowAllProduct />
            <Footer />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
