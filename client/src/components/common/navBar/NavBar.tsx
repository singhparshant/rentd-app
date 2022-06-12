import React from "react";
import "./NavBar.css"
import logo from "../../../assets/logo.png"
import { Link } from "react-router-dom"
import { ReactComponent as CartIcon } from "../../../assets/icons/cart.svg"
import Button from "@mui/material/Button"
import {ReactComponent as SearchIcon} from "../../../assets/icons/search.svg"
interface NavbarProps {
  mode?: "customer" | "supplier" | "admin"
};

const NavBar = ({ mode }: NavbarProps) => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <div className="searchField">
        <input className="searchInput" type="text" placeholder="Search for products" />
        <SearchIcon/>
      </div>
      <Link to="/cart">
        <CartIcon />
      </Link>
      <Link to="/register">
        <Button children="Join Us" />
      </Link>
    </nav>
  )
};

export default NavBar;
