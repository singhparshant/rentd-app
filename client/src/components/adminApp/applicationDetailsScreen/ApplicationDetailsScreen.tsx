import React from "react";
import { useLocation } from "react-router-dom";
import { parseDate } from "../../../utils/functions";
import { Application } from "../../common/interfaces/Interfaces";
import "./applicationDetails.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import acceptIcon from "../../../assets/accept.png";
import rejectIcon from "../../../assets/reject.png";

export default function ApplicationDetailsScreen() {
  const location = useLocation();
  const application: Application = location.state as Application;

  return (
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
        <p>
          <span className="label">IBAN: </span>
          {application.IBAN}
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
            <FileDownloadOutlinedIcon
              sx={{ marginLeft: 1, cursor: "pointer" }}
              titleAccess="download"
            />
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
              <FileDownloadOutlinedIcon
                sx={{ marginLeft: 1, cursor: "pointer" }}
                titleAccess="download"
              />
            </span>
          ))}
        </div>
      </div>

      <div className="buttons">
        <div className="button">
          <img src={acceptIcon} alt="" className="icon" />
          Accept
        </div>
        <div className="button">
          <img src={rejectIcon} alt="" className="icon" />
          Reject
        </div>
      </div>
    </div>
  );
}
