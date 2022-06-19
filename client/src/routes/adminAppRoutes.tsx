import { Redirect } from "react-router-dom";
import {
  applicationsByIdPath,
  applicationsPath,
  landingPagePath,
  profilePath,
} from "../api/requestPaths";
import ApplicationDetailsScreen from "../components/adminApp/applicationDetailsScreen/ApplicationDetailsScreen";
import ApplicationsScreen from "../components/adminApp/applicationsScreen/ApplicationsScreen";
import NotFound from "../components/common/notFound/NotFound";
import ProfileScreen from "../components/common/profileScreen/ProfileScreen";
import { AppRoute } from "./customerAppRoutes";

export const adminAppRoutes: Array<AppRoute> = [
  {
    path: landingPagePath,
    component: <Redirect to={applicationsPath} />,
  },

  {
    path: applicationsPath,
    component: <ApplicationsScreen />,
  },

  {
    path: applicationsByIdPath,
    component: <ApplicationDetailsScreen />,
  },
  { path: profilePath, component: <ProfileScreen /> },

  {
    path: "/*",
    component: <NotFound />,
  },
];
