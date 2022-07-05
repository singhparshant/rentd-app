import React from "react";
import "./NavBar.css";
import logo from "../../../assets/logo.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import useAuthState from "../../../zustand/useAuthState";
import Cart from "./Cart";
import axiosInstance from "../../../api/axios";

interface NabBarProps {
  user: any;
  onLogout: () => void;
}

const NavBar = () => {
  const history = useHistory();
  const user = useAuthState((state: any) => state.user);
  const setUser = useAuthState((state: any) => state.setUser);

  const handleLogout = async () => {
    try {
      //delete jwt cookie from browser
      await axiosInstance.get("/users/logout");
      setUser(null);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user || user.role === "customer")
    return <CustomerNavBar user={user} onLogout={handleLogout} />;
  if (user.role === "supplier")
    return <SupplierNavBar user={user} onLogout={handleLogout} />;
  if (user.role === "admin")
    return <AdminNavBar user={user} onLogout={handleLogout} />;
  return <></>;
};

// const handlSearchChange = ()

const CustomerNavBar = ({ user, onLogout }: NabBarProps) => {
  const location = useLocation();
  const filter = createFilterOptions<any>();
  const [value, setValue] = React.useState<any | null>(null);

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <React.Fragment>
        <Autocomplete
          // onChange={handlSearchChange}
          style={{ backgroundColor: "white", borderRadius: 7 }}
          value={value}
          onChange={(event: any, newValue: any) => {
            setValue(newValue);
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            return filtered;
          }}
          id="free-solo-dialog-demo"
          options={products}
          getOptionLabel={(option: any) => {
            // e.g value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props: any, option: any) => (
            <li {...props}>{option.name}</li>
          )}
          sx={{ width: 600, marginRight: 2, marginLeft: 2 }}
          freeSolo
          renderInput={(params: any) => (
            <TextField {...params} label="Search for products" />
          )}
        />
      </React.Fragment>
      <Link to="/cart">
        <Cart />
      </Link>
      {!user && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <div
              className={`button ${
                location.pathname === "/register" ? "active" : ""
              }`}
            >
              Join Us
            </div>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <div
              className={`button ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              Login
            </div>
          </Link>
        </div>
      )}

      {user && (
        <>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <div
              className={`button ${
                location.pathname === "/orders" ? "active" : ""
              }`}
            >
              Orders
            </div>
          </Link>

          <p className="greeting">Hello, {user.username}!</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <Avatar alt={user.name} src={user.imageUrl} />
            </Link>

            <div onClick={onLogout} className="button">
              Logout
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

const SupplierNavBar = ({ user, onLogout }: NabBarProps) => {
  const location = useLocation();

  const buttons = [
    {
      buttonText: "Products",
      path: "/products",
    },
    { buttonText: "Orders", path: "/orders" },
  ];
  return (
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>

        {buttons.map((btn) => (
          <Link to={btn.path} style={{ textDecoration: "none" }}>
            <div
              className={`button ${
                location.pathname === btn.path ? "active" : ""
              }`}
            >
              {btn.buttonText}
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="greeting">Hello, {user.username}!</p>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Avatar alt={user.name} src={user.imageUrl} />
        </Link>

        <div onClick={onLogout} className="button">
          Logout
        </div>
      </div>
    </nav>
  );
};

const AdminNavBar = ({ user, onLogout }: NabBarProps) => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>

        <Link to="/applications" style={{ textDecoration: "none" }}>
          <div
            className={`button ${
              location.pathname === "/applications" ? "active" : ""
            }`}
          >
            Applications
          </div>
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="greeting">Hello, {user.username}!</p>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Avatar alt={user.name} src={user.imageUrl} />
        </Link>

        <div onClick={onLogout} className="button">
          Logout
        </div>
      </div>
    </nav>
  );
};

const products: readonly any[] = [
  { name: "Bike" },
  { name: "Laptop" },
  { name: "Book" },
];

export default NavBar;
