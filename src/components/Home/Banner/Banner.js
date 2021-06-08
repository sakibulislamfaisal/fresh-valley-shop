import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  const [searchItem, setSearchItem] = useState(null);
  const handleSearchItem = (event) => setSearchItem(event.target.value);

  return (
    <section className="banner d-flex align-items-center text-center">
      <div className="container">
        <div className="search-box col-md-6 py-4 mx-auto">
          <input
            onChange={handleSearchItem}
            className=" placeholder-green-500   form-control text-transparent search-field"
            type="text"
            name="search"
            id="search"
            placeholder="Search Your Products.."
          />
          <Link to={"/search/" + searchItem}>
            <button
              onClick={() => window.scrollBy(0, 800)}
              className="btn btn-success search-btn"
            >
              Search
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
