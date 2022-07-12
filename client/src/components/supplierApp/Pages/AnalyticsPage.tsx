import { Redirect } from "react-router-dom";
import useAuthState from "../../../zustand/useAuthState";

const AnalyticsPage = () => {
    const user = useAuthState((state: any) => state.user);
  return (
    <div>
        {user ? (
        <div className="mainboard-div">
        Your Analytics Page
        </div>
        ) : <Redirect to="/login" />}
    </div>
  )
}

export default AnalyticsPage