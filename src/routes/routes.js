import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Pharmacie from "../components/admin/Pharmacie/Pharmacie";
import ViewPharmacie from "../components/admin/Pharmacie/ViewPharmacie";

const routes = [
  { path: "/admin", exact: true, name: "Admin" },
  {
    path: "/admin/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  { path: "/admin/profile", exact: true, name: "Profile", component: Profile },
  {
    path: "/admin/add-pharmacie",
    exact: true,
    name: "Pharmacie",
    component: Pharmacie,
  },
  {
    path: "/admin/view-pharmacie",
    exact: true,
    name: "ViewPharmacie",
    component: ViewPharmacie,
  },
];

export default routes;
