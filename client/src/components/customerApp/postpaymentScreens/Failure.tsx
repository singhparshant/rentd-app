import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCartPath } from "../../../api/requestPaths";

type Props = {};

const Failure = (props: Props) => {
  const [seconds, setSeconds] = useState(3);
  const history = useHistory();
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    const interval = setInterval(() => {
      history.push(getCartPath);
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
      <CancelIcon fontSize="large" sx={{ color: "red" }} />
      Payment failed. Redirecting to Cart in &nbsp;
      <strong>{seconds} seconds</strong>
    </div>
  );
};

export default Failure;
