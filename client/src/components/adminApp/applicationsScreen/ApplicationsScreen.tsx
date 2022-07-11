import { CircularProgress } from "@mui/material";
import React from "react";
import { useApplications } from "../../../hooks/useApplications";
import ApplicationsOverview from "./ApplicationsOverview";

export default function ApplicationsScreen() {
  const { applications, loading, error } = useApplications("pending");

  console.log("applications", applications);

  if (error) {
    console.log(error);
    return <></>;
  }
  return loading ? (
    <CircularProgress
      sx={{
        marginLeft: "50%",
        marginTop: "20px",
        marginBottom: "20px",
        color: "#2b0245",
      }}
    />
  ) : (
    <ApplicationsOverview applications={applications} />
  );
}
