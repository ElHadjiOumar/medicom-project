import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Pharmacie from "../components/admin/Pharmacie/Pharmacie";
import ViewPharmacie from "../components/admin/Pharmacie/ViewPharmacie";
import EditPharmacie from "../components/admin/Pharmacie/EditPharmacie";
import Medicament from "../components/admin/Medicament/Medicament";
import ViewMedicament from "../components/admin/Medicament/ViewMedicament";
import EditMedicament from "../components/admin/Medicament/EditMedicament";

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
  {
    path: "/admin/edit-pharmacie/:id",
    exact: true,
    name: "EditPharmacie",
    component: EditPharmacie,
  },
  {
    path: "/admin/add-medicament",
    exact: true,
    name: "Medicament",
    component: Medicament,
  },
  {
    path: "/admin/view-medicament",
    exact: true,
    name: "ViewMedicament",
    component: ViewMedicament,
  },
  {
    path: "/admin/edit-medicament/:id",
    exact: true,
    name: "EditMedicament",
    component: EditMedicament,
  },
];

export default routes;
