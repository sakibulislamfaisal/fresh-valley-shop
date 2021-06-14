import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconButton, Badge } from "@material-ui/core";
import "./Header.css";
import { ShoppingCart } from "@material-ui/icons";
import { userContext } from "../../../App";

const Header = ({ cart }) => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  console.log("From header Logged In user", loggedInUser);

  let style = {
    textDecoration: "none",
    padding: "15px",
    fontSize: "17px",
    fontWeight: "bold",
    color: "black",
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="hover:bg-red-100">
        <Container>
          <Link style={style} to="/">
            {" "}
            <Navbar.Brand>Fresh Valley Shop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto no-underline">
              <Link style={style} to="/">
                Home
              </Link>
              <Link style={style} to="/orders">
                Orders
              </Link>
              <Link style={style} to="/admin">
                Admin
              </Link>
              <Link style={style} to="/delivery">
                Delivery
              </Link>

              <IconButton
                component={Link}
                to="/checkout"
                aria-label="Show Cart Items"
                color="default"
                className="icon-button"
              >
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {loggedInUser || sessionStorage.getItem("email") ? (
                <Link style={style}>{loggedInUser.username}</Link>
              ) : (
                <Link style={style}>{loggedInUser.displayName}</Link>
              )}

              {/* {loggedInUser && (
                <NavDropdown title={loggedInUser.username}>
                  <NavDropdown.Item>SignOut</NavDropdown.Item>
                </NavDropdown>
              )} */}

              {loggedInUser.email && sessionStorage.getItem("email") ? (
                <Link style={style} to="/signup">
                  <button
                    onClick={() => setLoggedInUser("")}
                    className="bg-red-500 hover:bg-green-700 text-white  py-1 -mt-1 px-4 rounded-full "
                  >
                    SignOut
                  </button>
                </Link>
              ) : (
                <Link style={style} to="/signup">
                  <button className="bg-blue-500 hover:bg-green-700 text-white  py-1 -mt-1 px-4 rounded-full ">
                    Login
                  </button>
                </Link>
              )}
              {/* {auth.user ? (
                <button
                  onClick={auth.signOut()}
                  className="bg-blue-500 hover:bg-green-700 text-white  py-1 -mt-1 px-4 rounded-full "
                >
                  Logout
                </button>
              ) : (
                <Link style={style} to="/login">
                  <button className="bg-blue-500 hover:bg-green-700 text-white  py-1 -mt-1 px-4 rounded-full ">
                    Login
                  </button>
                </Link>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default React.memo(Header);
