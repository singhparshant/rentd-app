import React from "react";
import "./NavBar.css";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../../assets/icons/cart.svg";
import Button from "@mui/material/Button";
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import useAuthState from "../../../zustand/useAuthState";

const filter = createFilterOptions<any>();

const NavBar = () => {
  const user = useAuthState((state: any) => state.user);
  const [value, setValue] = React.useState<any | null>(null);

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <React.Fragment>
        <Autocomplete
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
        <CartIcon />
      </Link>
      {!user && (
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button children={<span>Join Us</span>} style={{ marginRight: 10 }} />
        </Link>
      )}

      {user && (
        <>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <Button
              children={<span>Orders</span>}
              style={{ marginRight: 10 }}
            />
          </Link>

          <p>Hello, {user.name}</p>
          <Link to="/profile">
            <Avatar alt={user.name} src={user.imageUrl} />
          </Link>
        </>
      )}
    </nav>
  );
};

const products: readonly any[] = [
  { name: "Bike" },
  { name: "Laptop" },
  { name: "Book" },
];

export default NavBar;
