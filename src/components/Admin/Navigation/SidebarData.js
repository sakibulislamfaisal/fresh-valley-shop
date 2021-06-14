import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { faPersonBooth, faPlus, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Add Products",
    path: "/add-products",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "All Products",
    path: "/all-products",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "All Orders",
    path: "/admin-all-orders",
    icon: <FontAwesomeIcon icon={faShoppingBasket} />,
    cName: "nav-text",
  },
  // {
  //   title: "User Login",
  //   path: "/login",
  //   icon: <FontAwesomeIcon icon={faPersonBooth} />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Support",
  //   path: "/support",
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: "nav-text",
  // },
];
