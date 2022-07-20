import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getOrdersPath } from "../../../api/requestPaths";

type Props = {};

const Success = (props: Props) => {
  const [seconds, setSeconds] = useState(3);
  const history = useHistory();
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    const interval = setInterval(() => {
      history.push(getOrdersPath);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, [history]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      {" "}
      <CheckCircleIcon fontSize="large" sx={{ color: "green" }} />
      Payment is successful. Redirecting to Orders in &nbsp;
      <strong>{seconds} seconds</strong>
    </div>
  );
};

export default Success;
