import React, { useEffect, useState } from "react";
import SingleProduct from "../SingleProduct/SingleProduct";

const Product = ({ cart, addToCartProduct }) => {
  const [products, setProducts] = useState([]);
  document.title = "Product Page";
  useEffect(() => {
    fetch("https://fresh-valley-shop-server.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //  console.log(products);

  return (
    <section className="product-container py-5 ">
      <div className="container">
        <div className="row ">
          {products.map((product) => (
            <SingleProduct
              product={product}
              key={product.id}
              cart={cart}
              addToCartProduct={addToCartProduct}
            ></SingleProduct>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Product);
