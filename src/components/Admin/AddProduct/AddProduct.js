import axios from "axios";
import { faFacebook, faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const [imageURL, setImageURL] = useState(null);
  const validationSchema = Yup.object().shape({
    id: Yup.number().positive().integer().required(),
    name: Yup.string().required(" Product Name is required!"),
    category: Yup.string().required("Product category is required!"),
    price: Yup.string().required("Product price is required!"),
    description: Yup.string().required("Product description is required!"),
    img: Yup.string().required("Product img is required!"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  let history = useHistory();
  const handleFileChange = (event) => {
    //console.log(e.target.files[0]);
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "18ade17cde2c79bfba3f1032fe60cd36");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        //console.log(response);
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = (data, event) => {
    const productData = {
      id: data.id,
      name: data.name,
      category: data.category,
      price: data.price,
      description: data.description,
      img: imageURL,
    };
    const url = `https://fresh-valley-shop-server.herokuapp.com/add-products`;

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    history.push("/all-products");
  };

  return (
    <div className=" py-5 bg-pink-100 h-100  ">
      <div className="container ">
        <h5 className="text-center">Add New Product</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div>
              <label>Product Name</label>
              <input
                type="text"
                name="id"
                {...register("id")}
                className="placeholder-pink-700  "
                placeholder="Enter Your Product Id"
              />
              {errors.id && <p className="error-form">{errors.id.message}</p>}
            </div>
          </div>
          <div className="form-group">
            <div>
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                {...register("name")}
                className="placeholder-pink-700  "
                placeholder="Enter Your Product Name"
              />
              {errors.name && (
                <p className="error-form">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <div>
              <label>Product Category</label>
              <input
                type="text"
                name="category"
                {...register("category")}
                className="placeholder-pink-700  "
                placeholder="Enter Your Product Category"
              />
              {errors.category && (
                <p className="error-form">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <div>
              <label>Product Price</label>
              <input
                type="text"
                name="price"
                {...register("price")}
                className="placeholder-pink-700  "
                placeholder="Enter Your Product Price"
              />
              {errors.price && (
                <p className="error-form">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <div>
              <label>Product Description</label>
              <input
                type="text"
                name="description"
                {...register("description")}
                className="placeholder-pink-700  "
                placeholder="Enter Your Product Description"
              />
              {errors.description && (
                <p className="error-form">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <div>
              <label>Product Image</label>
              <input
                type="file"
                name="img"
                {...register("img")}
                onChange={handleFileChange}
              />
              {errors.img && <p className="error-form">{errors.img.message}</p>}
            </div>
          </div>

          <div className="form-group ">
            <button
              className="bg-pink-700 text-white py-3 px-4  mt-3  rounded cart-add"
              disabled
            >
              <FontAwesomeIcon icon={faUserPlus} /> Add Product
            </button>
            <p className="error-form">
              Note : You can not add product because button is disabled!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
