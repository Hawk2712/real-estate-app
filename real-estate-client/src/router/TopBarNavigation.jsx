import { LanguageIcon } from "@heroicons/react/24/solid";
import { Role } from "../config/constants";

const TopBarNavigation = (role) => {
  if (role == Role.ADMIN) {
    return adminNavigation;
  }
  return userNavigation;
};
export default TopBarNavigation;

const adminNavigation = [
  {
    label: "Home",
    icon: LanguageIcon,
    path: "/admin/home",
  },
  {
    label: "Users",
    icon: LanguageIcon,
    path: "/admin/users",
  },
];
const userNavigation = [
  {
    label: "Home",
    icon: LanguageIcon,
    path: "/user/home",
  },
  {
    label: "Property",
    icon: LanguageIcon,
    path: "/user/property",
  },
  {
    label: "Bookings",
    icon: LanguageIcon,
    path: "/user/bookings",
  },
  {
    label: "Onsite Requests",
    icon: LanguageIcon,
    path: "/user/onsite",
  },
];
