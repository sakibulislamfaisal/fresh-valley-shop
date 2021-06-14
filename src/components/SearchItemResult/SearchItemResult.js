import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchProduct from "../SearchProduct/SearchProduct";

import "./SearchItemResult.css";

const SearchItemResult = ({cart, addToCartProduct}) => {
  const { searchItem } = useParams();
  const [allFood, setAllFood] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5200/products")
      .then((res) => res.json())
      .then((data) => setAllFood(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(allFood);

  const SearchingResult = allFood.filter((product) =>
    product.name.includes(searchItem)
  );
  console.log(SearchingResult);

  return (
    <section className="search-section">
      <div className="container">
        <div className="text-center py-4 search">
          <h3>Search Result</h3>
        </div>
        <div className="row py-4">
          {SearchingResult.length === 0 && (
            <h3 className="text-danger col-12 text-center">No Product Found!!!</h3>
          )}
          {SearchingResult.map((product) => (
            <SearchProduct cart={cart} addToCartProduct={addToCartProduct} product={product} key={product.id}></SearchProduct>
          ))}
        </div>
        <div className="text-center">
          <Link to="/">
            <button className="btn btn-danger">See Our All Product</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SearchItemResult;
