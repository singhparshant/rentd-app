import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import logo from "../../../assets/logo.png";
import useAuthState from "../../../zustand/useAuthState";
import useCart from "../../../zustand/useCart";
import useFilters from "../../../zustand/useFilters";
import Cart from "./Cart";
import "./NavBar.css";

interface NabBarProps {
  user: any;
  onLogout: () => void;
}

const NavBar = () => {
  const { emptyCart } = useCart() as any;
  const history = useHistory();
  const user = useAuthState((state: any) => state.user);
  const setUser = useAuthState((state: any) => state.setUser);
  const resetFilters = useFilters((state: any) => state.resetFilters);

  const handleLogout = async () => {
    try {
      emptyCart();

      //delete jwt cookie from browser
      await axiosInstance.get("/users/logout");

      setUser(null);
      resetFilters();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user || user.role === "customer")
    return <CustomerNavBar user={user} onLogout={() => handleLogout()} />;
  if (user.role === "supplier")
    return <SupplierNavBar user={user} onLogout={() => handleLogout()} />;
  if (user.role === "admin")
    return <AdminNavBar user={user} onLogout={handleLogout} />;
  return <></>;
};

// const handlSearchChange = ()

const CustomerNavBar = ({ user, onLogout }: NabBarProps) => {
  const location = useLocation();
  const filter = createFilterOptions<any>();
  const setFilters = useFilters((state: any) => state.setFilters);
  const resetFilters = useFilters((state: any) => state.resetFilters);
  const [searchString, setSearchString] = React.useState<any>(null);
  const history = useHistory();

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFilters("searchString", searchString);
      history.push("/");
    }
    setSearchString(searchString);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <React.Fragment>
        <Autocomplete
          value={searchString || null}
          onChange={(event: any, newValue: any) => {
            if (event.type === "click") {
              resetFilters();
            }
            setSearchString(newValue);
          }}
          className="autocomplete"
          style={{ backgroundColor: "white", borderRadius: 7 }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            return filtered;
          }}
          id="free-solo-dialog-demo"
          options={[]}
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
          onKeyUp={handleSubmit}
          renderOption={(props: any, option: any) => (
            <li {...props}>{option.name}</li>
          )}
          sx={{ width: 600, marginRight: 2, marginLeft: 2, padding: 0.3 }}
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
  const resetFilters = useFilters((state: any) => state.resetFilters);

  const buttons = [
    {
      buttonText: "Products",
      path: "/products",
    },
    { buttonText: "+ Add product", path: "/addProduct" },
    { buttonText: "Orders", path: "/orders" },
  ];
  return (
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link onClick={resetFilters} to="/">
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

        <div onClick={() => onLogout()} className="button">
          Logout
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
