import {
  applicationsByIdPath,
  applicationsPath,
  landingPagePath,
  profilePath,
} from "../api/requestPaths";
import AdminHomeScreen from "../components/adminApp/adminHomeScreen/AdminHomeScreen";
import ApplicationDetailsScreen from "../components/adminApp/applicationDetailsScreen/ApplicationDetailsScreen";
import ApplicationsScreen from "../components/adminApp/applicationsScreen/ApplicationsScreen";
import NotFound from "../components/common/notFound/NotFound";
import ProfileScreen from "../components/common/profileScreen/ProfileScreen";
import { AppRoute } from "./customerAppRoutes";

export const adminAppRoutes: Array<AppRoute> = [
  {
    path: landingPagePath,
    component: <AdminHomeScreen />,
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
