import { Role } from "../config/constants";
import AuthGuard from "../layout/guard/AuthGuard";
import UserLayout from "../layout/UserLayout";
import UserPage from "../pages/admin/UserPage";
import IndexPage from "../pages/IndexPage";
import ProfilePage from "../pages/ProfilePage";
import PropertyDetails from "../pages/PropertyDetails";
import BookingsPage from "../pages/user/bookings/Page";
import OnsiteRequestPage from "../pages/user/onsite/Page";
import AddEditProperty from "../pages/user/property/AddEdit";
import PropertyPage from "../pages/user/property/Page";

const RouteBuilder = (role) => {
  if (role == Role.ADMIN) {
    return adminRoutes;
  }
  return userRoutes;
};
export default RouteBuilder;

const adminRoutes = [
  {
    path: "/admin",
    element: (
      <AuthGuard>
        <UserLayout />
      </AuthGuard>
    ),
    children: [
      { path: "home", element: <IndexPage /> },
      { path: "users", element: <UserPage /> },
      { path: "property-details/:id", element: <PropertyDetails /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
];

const userRoutes = [
  {
    path: "/user",
    element: (
      <AuthGuard>
        <UserLayout />
      </AuthGuard>
    ),
    children: [
      { path: "home", element: <IndexPage /> },
      { path: "property", element: <PropertyPage /> },
      { path: "add-edit-property/:id?", element: <AddEditProperty /> },
      { path: "bookings", element: <BookingsPage /> },
      { path: "onsite", element: <OnsiteRequestPage /> },
      { path: "property-details/:id", element: <PropertyDetails /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
];
