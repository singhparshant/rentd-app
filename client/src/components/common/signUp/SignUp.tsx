import * as React from "react";
import { useRef, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";
import validator from "validator";
import { ReactComponent as Tick } from "../../../assets/icons/tick.svg";
const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    address: "",
    role: "customer",
    IBAN: "",
  });

  const [documents, setDocuments] = useState<any>({
    codeOfConduct: null,
    KYCDocs: [],
  });

  //auto scroll
  useEffect(() => {
    userData.role === "customer"
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : window.scroll({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [userData.role]);

  const uploadCodeOfConductRef = useRef<any>(null);
  const uploadKYCDocsRef = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev: UserData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    if (fileType === "code") {
      setDocuments((prev: any) => ({
        ...prev,
        codeOfConduct: e.target.files?.[0],
      }));
    } else {
      setDocuments((prev: any) => ({
        ...prev,
        KYCDocs: e.target.files,
      }));
    }
  };

  const isValidForm = () => {
    let valid =
      userData.username &&
      userData.password === userData.passwordConfirm &&
      validator.isEmail(userData.email);
    //make sure documents are uploaded
    if (userData.role === "supplier")
      valid &&=
        documents.codeOfConduct &&
        documents.KYCDocs.length > 0 &&
        validator.isIBAN(userData.IBAN);
    return valid;
  };

  const handleSignUp = () => {
    if (!isValidForm()) {
      toast.error("Invalid data!");
    } else {
      const toastId = toast.loading("Loading");

      try {
        userData.role === "customer"
          ? handleCustomerSignup()
          : handleSupplierSignup();

        toast.dismiss(toastId);
        toast.success("Done!");
        history.push("/login");
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!");
      }

      // const fileReader = new FileReader();
      // let codeOfConductResult: any = "";

      // fileReader.onload = async (fileLoadedEvent) => {
      //   codeOfConductResult = fileLoadedEvent.target?.result;
      //   // Print data in console
      //   await axiosInstance.post("/user/test", {
      //     codeOfConduct: codeOfConductResult,
      //   });
      //   console.log("uploaded!");
      // };
      // // Convert data to base64
      // fileReader.readAsDataURL(documents.codeOfConduct);
    }
  };

  const handleCustomerSignup = () => {
    //create an account for the customer
    axiosInstance.post("/users", {});
  };
  const handleSupplierSignup = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ boxShadow: 5, paddingBottom: 5, marginTop: 10 }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#2b0245" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  error={
                    userData.email !== "" && !validator.isEmail(userData.email)
                  }
                  helperText={
                    userData.email !== "" &&
                    !validator.isEmail(userData.email) &&
                    "invalid email"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="new-password"
                  value={userData.passwordConfirm}
                  onChange={handleChange}
                  error={userData.password !== userData.passwordConfirm}
                  helperText={
                    userData.password !== userData.passwordConfirm &&
                    "passwords do not match"
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Join as
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="customer"
                      control={<Radio />}
                      label="Customer"
                    />
                    <FormControlLabel
                      value="supplier"
                      control={<Radio />}
                      label="Supplier"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {userData.role === "supplier" && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="IBAN"
                      label="IBAN"
                      id="IBAN"
                      value={userData.IBAN}
                      onChange={handleChange}
                      error={
                        userData.IBAN !== "" && !validator.isIBAN(userData.IBAN)
                      }
                      helperText={
                        userData.IBAN !== "" &&
                        !validator.isIBAN(userData.IBAN) &&
                        "Invalid IBAN"
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <>
                      <FormLabel>Code of Conduct:</FormLabel>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileUpload(e, "code")}
                        style={{ display: "none" }}
                        ref={uploadCodeOfConductRef}
                      ></input>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: 10,
                        }}
                      >
                        <FileDownloadOutlinedIcon
                          sx={{ marginRight: 1, cursor: "pointer" }}
                          onClick={() => console.log("trigger download")}
                          titleAccess="download"
                        />

                        <FileUploadOutlinedIcon
                          sx={{
                            marginRight: 1,
                            cursor: "pointer",
                          }}
                          onClick={() => uploadCodeOfConductRef.current.click()}
                          titleAccess="upload"
                        />
                        {documents.codeOfConduct && (
                          <>
                            <span style={{ color: "green" }}>Uploaded!</span>
                            <Tick style={{ color: "green" }} />
                          </>
                        )}
                      </div>
                    </>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FormLabel>KYC Docs:</FormLabel>
                    <input
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      ref={uploadKYCDocsRef}
                      onChange={(e) => handleFileUpload(e, "kyc")}
                    ></input>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 10,
                      }}
                    >
                      <FileUploadOutlinedIcon
                        sx={{ cursor: "pointer", marginRight: 1 }}
                        titleAccess="upload"
                        onClick={() => uploadKYCDocsRef.current.click()}
                      />
                      {documents.KYCDocs.length > 0 && (
                        <>
                          <span style={{ color: "green" }}>Uploaded!</span>
                          <Tick style={{ color: "green" }} />
                        </>
                      )}
                    </div>
                  </Grid>
                </>
              )}
            </Grid>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="button"
                style={{ width: "60px", textAlign: "center" }}
                onClick={handleSignUp}
              >
                Sign Up
              </div>

              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                {"Already have an account? Sign In"}
              </Link>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

interface UserData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
  IBAN: string;
  role: "customer" | "supplier";
}
