import React from "react";
import { Link } from "react-router-dom";
import { Application } from "../../common/interfaces/Interfaces";
import "./application.css";
import applicationImage from "../../../assets/application.png";
import { parseDate } from "../../../utils/functions";
import { Card } from "@mui/material";

interface ApplicationsOverviewProps {
  applications: Application[];
}

export default function ApplicationsOverview({
  applications,
}: ApplicationsOverviewProps) {
  return (
    <div className="applicationCardsContainer">
      <h1>Pending Applications</h1>
      {applications.length > 0 ? (
        <>
          {applications.map((application, index) => (
            <Link
              to={{
                pathname: `/applications/${application._id}`,
                state: application,
              }}
              style={{ textDecoration: "none", width: "60%", color: "black" }}
            >
              <Card
                sx={{
                  margin: "8px",
                  transition: "transform 0.15s ease-in-out",
                  "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                }}
              >
                <div key={index} className="applicationCard">
                  <p>Application {index + 1}</p>

                  <div>
                    <div style={{ paddingBottom: 5 }}>
                      <b>email:</b> {application.email}
                    </div>
                    {application.createdAt && (
                      <span>
                        <b>created at: </b>
                        {parseDate(new Date(application.createdAt))}
                      </span>
                    )}
                  </div>

                  <img
                    className="applicationImage"
                    src={applicationImage}
                    alt=""
                  />
                </div>
              </Card>
            </Link>
          ))}
        </>
      ) : (
        <div style={{ fontSize: 20 }}>
          currently, you don't have any pending applications
        </div>
      )}
    </div>
  );
}
