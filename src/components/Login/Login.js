import { faFacebook, faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../App";
import "./Login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  facebookSignIn,
  googleSignIn,
  initializeFramework,
  signInUser,
  getCurrentUser,
 
} from "./LoginManager";

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid Email Format!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters!")
      .max(12, "Password must be at least 12 characters!"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  initializeFramework();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  console.log("from login", loggedInUser);
  const [user, setUser] = useState({
    email: "",
    password: "",
    success: false,
    errorMessage: "",
  });
  console.log("from login ", user);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //get current user information

  const handleGoogleSignIn = () => {
    googleSignIn().then((response) => {
      setLoggedInUser(response);
      getCurrentUser(response);
    
      history.replace(from);
    });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn().then((response) => {
      setLoggedInUser(response);
      getCurrentUser(response);
    
      history.replace(from);
     
    });
  };

  const onSubmit = (data, event) => {
    console.log(data);
    event.preventDefault();
    if (data.email && data.password) {
      signInUser(data.email, data.password).then((response) => {
        setUser(response);
        setLoggedInUser(response);
        getCurrentUser(response);
       
        history.replace(from);
      });
    }
  };

  return (
    <div className=" py-5 bg-pink-100 h-100 ">
      <div className="container ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                {...register("email")}
                className="placeholder-pink-700  "
                placeholder="Enter Your Email"
              />
              {errors.email && (
                <p className="error-form">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                {...register("password")}
                className="placeholder-pink-700  "
                placeholder="Enter Your Password"
              />
              {errors.password && (
                <p className="error-form">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="form-group ">
            <button className="bg-pink-700 text-white py-3 px-4  mt-3  rounded cart-add">
              <FontAwesomeIcon icon={faUserPlus} /> Login
            </button>
          </div>
          <div className="text-indigo-700 text-xl font-bold  text-center ">
            <Link to="/signup">
              {" "}
              <label
                onClick={() => setLoggedInUser(true)}
                style={{
                  textDecoration: "underline",
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                Already Have an Account{" "}
              </label>
            </Link>
          </div>
        </form>
      </div>

      <div className="others">
        <div className="form-group change">
          <button
            onClick={handleGoogleSignIn}
            className="btn  border border-primary btn-block google"
          >
            <FontAwesomeIcon
              className="google-icon mt-1"
              icon={faGooglePlusG}
            />
            Continue With Google
          </button>
        </div>{" "}
        <div className="form-group change">
          <button
            onClick={handleFacebookSignIn}
            className="btn border border-primary  btn-block google "
          >
            <FontAwesomeIcon className="google-icon mt-1" icon={faFacebook} />
            Continue With Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
