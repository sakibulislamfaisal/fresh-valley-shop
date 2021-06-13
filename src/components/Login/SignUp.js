import { faFacebook, faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
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
  signUpNewUser,
  signInUser,
  updateUserProfile,

} from "./LoginManager";

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("First Name is required!")
      .min(4, "Username must be at least 4 characters!"),

    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters!"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match!")
      .required("Confirm Password is required!"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  initializeFramework();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  console.log("from login", loggedInUser);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    username: "",
    email: "",
    confirmPassword: "",
    success: false,
    errorMessage: "",
  });
  console.log("from login ", user);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    googleSignIn().then((response) => {
      setLoggedInUser(response);
     
      history.replace(from);
    });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn().then((response) => {
      setLoggedInUser(response);
    
      history.replace(from);
    });
  };


 

  // const handleChange = (event) => {
  //   let isFieldValid = true;
  //   if (event.target.name === "username") {
  //     //console.log(event.target.name, event.target.value);
  //     isFieldValid = /^[a-zA-Z ]{2,30}$/.test(event.target.value);
  //   }
  //   if (event.target.name === "email") {
  //     //console.log(event.target.name, event.target.value);
  //     isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
  //   }
  //   if (event.target.name === "password") {
  //     // console.log(event.target.name, event.target.value);
  //     isFieldValid = /\d{1}/.test(event.target.value);
  //   }
  //   if (isFieldValid === true) {
  //     const newUserInfo = { ...user };
  //     newUserInfo[event.target.name] = event.target.value;
  //     setUser(newUserInfo);
  //     console.log(newUserInfo);
  //   }
  // };
  const onSubmit = (data, event) => {
    console.log(data);
    event.preventDefault();
    if (data.username && data.email && data.confirmPassword) {
      signUpNewUser(data.username, data.email, data.confirmPassword).then(
        (res) => {
          setUser(res);
          updateUserProfile(res.username, res.email, res.password);
          setLoggedInUser(res);
         
          history.replace(from);
        }
      );
    }

    if (!newUser && data.email && data.password) {
      signInUser(data.email, data.password).then((response) => {
        setUser(response);
        setLoggedInUser(response);
        history.replace(from);
      });
    }
  };

  return (
    <div className="signup py-5 bg-pink-100 h-100 ">
      <div className="container ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                {...register("username")}
                className="placeholder-pink-700  "
                placeholder="Enter Your Username"
              />
              {errors.username && <p className="error-form">{errors.username.message}</p>}
            </div>
          </div>
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
              {errors.email && <p className="error-form">{errors.email.message}</p>}
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
              {errors.password && <p className="error-form">{errors.password.message}</p>}
            </div>
          </div>
          <div className="form-group">
            <div>
              <label>ConfirmPassword</label>
              <input
                type="password"
                name="confirmPassword"
                {...register("confirmPassword")}
                className="placeholder-pink-700  "
                placeholder="Enter Your Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="error-form">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <div className="form-group ">
            <button className="bg-pink-700 text-white py-3 px-4  mt-3  rounded cart-add">
              <FontAwesomeIcon icon={faUserPlus} /> Create Account
            </button>
          </div>
          <div className="text-indigo-700 text-xl font-bold  text-center ">
            Already Have an Account go to{" "}
            <Link to="/login">
              {" "}
              <label
                onClick={() => setLoggedInUser(true)}
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ( Login Page)
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

export default SignUp;
