import React from "react";
import "./NavBar.css"
import logo from "../../../assets/logo.png"
import { Link } from "react-router-dom"

interface NavbarProps {
  mode?: "customer" | "supplier" | "admin"
};

const NavBar = ({ mode }: NavbarProps) => {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <div className="searchField">
        <input className="searchInput" type="text" placeholder="Search for products" />
        <svg className="searchIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  )
};

export default NavBar;
