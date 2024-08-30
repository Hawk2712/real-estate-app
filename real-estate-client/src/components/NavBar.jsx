import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
// import { HomeIcon } from "@heroicons/react/16/solid";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../lib/hooks/useAuth";
import { Link } from "react-router-dom";
import user from "../assets/images/user.png";
import { API_URL } from "../config/env-helper";
import { Role } from "../config/constants";

const NavbarComponent = ({ navListItems }) => {
  const [openNav, setOpenNav] = React.useState(false);
  // const navigate = useNavigate();
  const { isLoggedIn, role } = useAuth();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const NavList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navListItems.map(({ label, icon, path }, key) => (
        <Link to={path} key={key}>
          <Typography
            key={label}
            as="a"
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              <span className="text-gray-900"> {label}</span>
            </MenuItem>
          </Typography>
        </Link>
      ))}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-6">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          to={
            isLoggedIn
              ? role == Role.ADMIN
                ? "/admin/home"
                : "/user/home"
              : ""
          }
        >
          <Typography
            variant="h2"
            className="mr-4 cursor-pointer py-1.5 font-bold "
          >
           <span className='text-slate-500'>Estate</span>
           <span className='text-slate-700'>360</span>
          </Typography>
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{NavList}</div>
          <div className="flex items-center gap-x-1">
            <ProfileMenu />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>{NavList}</MobileNav>
    </Navbar>
  );
};

export default NavbarComponent;

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { logout, isLoggedIn, role, image } = useAuth();

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      path: role == Role.ADMIN ? "/admin/profile " : "/user/profile",
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      path: "",
    },
  ];

  return (
    <>
      {isLoggedIn ? (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              <Avatar
                variant="circular"
                size="sm"
                alt="tania andrew"
                className="border border-gray-900 p-0.5"
                src={image ? API_URL + image : user}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-1">
            {profileMenuItems.map(({ label, icon, path }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <Link to={path && path} key={key}>
                  <MenuItem
                    key={label}
                    onClick={label == "Sign Out" && logout}
                    className={`flex items-center gap-2 rounded ${
                      isLastItem
                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                        : ""
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                      strokeWidth: 2,
                    })}
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      href=""
                      color={isLastItem ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                </Link>
              );
            })}
          </MenuList>
        </Menu>
      ) : (
        <div className="flex items-center gap-x-1">
          <Link to={"/login"}>
            <Button variant="text" size="sm" className="hidden lg:inline-block">
              <span>Sign In</span>
            </Button>
          </Link>
          <Link to={"/register"}>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Sign Up</span>
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
