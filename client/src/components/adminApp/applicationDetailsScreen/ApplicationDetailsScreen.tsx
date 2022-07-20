import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parseDate } from "../../../utils/functions";
import { Application } from "../../common/interfaces/Interfaces";
import "./applicationDetails.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import acceptIcon from "../../../assets/accept.png";
import rejectIcon from "../../../assets/reject.png";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";
import { Container } from "@mui/material";

export default function ApplicationDetailsScreen() {
  const location = useLocation();
  const history = useHistory();
  const application: Application = location.state as Application;

  const handleStatusUpdate = (status: string) => {
    axiosInstance
      .post(`/applications/updateStatus/${application._id}?status=${status}`)
      .then(() => {
        toast.success("status updated!");
        history.push("/applications");
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong!");
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ boxShadow: 5, paddingBottom: 5, marginTop: 10 }}
    >
      <div className="applicationDetailsContainer">
        <h1>Application Details</h1>
        <div className="applicationDetails">
          <p>
            <span className="label">Email: </span>
            {application.email}
          </p>
          <p>
            <span className="label">Address: </span>
            {application.address}
          </p>
          {application.createdAt && (
            <p>
              <span className="label">Created at: </span>
              {parseDate(new Date(application.createdAt))}
            </p>
          )}

          <div>
            <div style={{ display: "flex" }}>
              <span className="label"> Code of conduct</span>
              <a
                href={
                  "data:application/pdf;base64," + application.codeOfConduct
                }
                download={`code of conduct.pdf`}
                target="_self"
                style={{
                  color: "black",
                  display: "flex",
                }}
              >
                <FileDownloadOutlinedIcon
                  sx={{ marginLeft: 1, cursor: "pointer" }}
                  titleAccess="download"
                />
              </a>
            </div>
            <p className="label">KYC Docs:</p>
            {application.KYCDocs.map((doc, index) => (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 10,
                  marginBottom: 10,
                }}
              >
                File {index + 1}
                <a
                  href={"data:application/pdf;base64," + doc}
                  download={`File ${index + 1}.pdf`}
                  target="_self"
                  style={{
                    color: "black",
                    display: "flex",
                  }}
                >
                  <FileDownloadOutlinedIcon
                    sx={{ marginLeft: 1, cursor: "pointer" }}
                    titleAccess="download"
                  />
                </a>
              </span>
            ))}
          </div>
        </div>

        <div className="buttons">
          <div
            className="button"
            onClick={() => handleStatusUpdate("accepted")}
          >
            <img src={acceptIcon} alt="" className="icon" />
            Accept
          </div>
          <div
            className="button"
            onClick={() => handleStatusUpdate("rejected")}
          >
            <img src={rejectIcon} alt="" className="icon" />
            Reject
          </div>
        </div>
      </div>
    </Container>
  );
}
