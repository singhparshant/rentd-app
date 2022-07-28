import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import useAuthState from "../../../zustand/useAuthState";

interface userInfo {
  username: string;
  address: string;
  oldPassword: string;
  email: string;
  role: string;
  newPassword: string;
}
export default function ProfileScreen() {
  const state = useAuthState() as any;
  // const [name, setName] = useState(0);
  // const [address, setAddress] = useState(0);
  const [details, setDetails] = useState<userInfo>({
    username: "",
    address: "",
    oldPassword: "",
    email: "",
    role: "",
    newPassword: "",
  });
  const setInfo = async (id: any) => {
    console.log("setInfo");
    const response = await axiosInstance.put("users/update/" + id, details);
    if (response) {
      toast.success("Profile updated");
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const id = state.user.id;
      console.log("id: ", id);
      const response = await axiosInstance.get("users/" + id);
      console.log("response is: ", response);
      setDetails((prev: any) => ({
        username: response.data.username,
        address: response.data.address,
        oldPassword: "",
        email: response.data.email,
        role: response.data.role,
        newPassword: "",
      }));
      console.log("hello");
    };
    fetchUser();
  }, [state.user.id]);

  //console.log("fetched user: ", fetchUser)
  //const { user } = useAuthState() as any;

  return (
    <div
      className="productdetailsScreen"
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Profile page</h1>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ boxShadow: 5, padding: 5, marginTop: 3 }}
      >
        <Box>
          <Box
            component="form"
            //onSubmit={handleSubmit}
          >
            <div>
              <h3>Profile details</h3>
              <TextField
                label="Name"
                margin="normal"
                type="string"
                required
                fullWidth
                placeholder="Name"
                name="username"
                value={details.username}
                onChange={(e: any) => {
                  setDetails((prev: any) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
              <TextField
                label="Address"
                margin="normal"
                required
                //fullWidth
                placeholder="Write your address here"
                name="address"
                autoComplete="address"
                fullWidth
                // autoFocus
                value={details.address}
                onChange={(e: any) => {
                  setDetails((prev: any) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
              <br />
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "black",
                }}
              >
                <h3 style={{ marginTop: "15px", marginBottom: "5px" }}>
                  Change password
                </h3>
                <TextField
                  label="Old password"
                  margin="normal"
                  required
                  type={"password"}
                  placeholder="Old password"
                  name="oldPassword"
                  autoComplete="Old password"
                  fullWidth
                  value={details.oldPassword}
                  onChange={(e: any) => {
                    setDetails((prev: any) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
                <TextField
                  label="New password"
                  margin="normal"
                  required
                  type={"password"}
                  placeholder="New password"
                  name="newPassword"
                  autoComplete="New password"
                  fullWidth
                  // autoFocus
                  value={details.newPassword}
                  onChange={(e: any) => {
                    setDetails((prev: any) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </div>
              {/* 
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  margin="normal"
                  label="Discount %"
                  //required
                  style={{ width: "50%", marginRight: "3%" }}
                  name="discount"
                  placeholder="Discount %"
                  type="number"
                  autoComplete="discount"
                  //value={newProduct.discount || ""}
                  //onChange={handleChange}
                />
                <TextField
                  label="Deposit in €"
                  margin="normal"
                  style={{ width: "50%" }}
                  //required
                  type="number"
                  name="deposit"
                  placeholder="Deposit in €"
                  autoComplete="deposit"
                  //value={newProduct.deposit || ""}
                  //onChange={handleChange}
                />
              </div> */}
            </div>
          </Box>
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5%",
          }}
        >
          <div
            className="button"
            style={{
              width: "fit-content",
              textAlign: "center",
            }}
            onClick={() => setInfo(state.user.id)}
          >
            <Typography style={{ fontSize: "20px" }}>Save</Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
