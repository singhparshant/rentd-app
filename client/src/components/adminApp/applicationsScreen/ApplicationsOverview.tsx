import React from "react";
import { Link } from "react-router-dom";
import { Application } from "../../common/interfaces/Interfaces";
import "./application.css";
import applicationImage from "../../../assets/application.png";
import { parseDate } from "../../../utils/functions";

interface ApplicationsOverviewProps {
  applications: Application[];
}

export default function ApplicationsOverview({
  applications,
}: ApplicationsOverviewProps) {
  return (
    <div className="applicationCardsContainer">
      <h1>Pending Applications</h1>
      {applications.map((application, index) => (
        <Link
          to={{
            pathname: `/applications/${application._id}`,
            state: application,
          }}
          style={{ textDecoration: "none", width: "80%", color: "black" }}
        >
          <div key={index} className="applicationCard">
            <p className="applicationTitle">Application {index + 1}</p>
            <div>
              <p className="applicationTitle">
                <b>applicant:</b> {application.email}
              </p>
              {application.createdAt && (
                <div className="applicationTitle">
                  <b>created at: </b>
                  {parseDate(new Date(application.createdAt))}
                </div>
              )}
            </div>
            <img className="applicationImage" src={applicationImage} alt="" />
          </div>
        </Link>
      ))}
    </div>
  );
}
