import { useNavigate, useRoutes } from "react-router-dom";
import { useAuth } from "../lib/hooks/useAuth";
import RouteBuilder from "../router/RouteBuilder";
import { useEffect } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import IndexPage from "../pages/IndexPage";
import TopBarNavigation from "../router/TopBarNavigation";
import NavbarComponent from "../components/NavBar";

const MainLayout = () => {
  const { isLoggedIn, role } = useAuth();
  //   const navigate = useNavigate();

  const getRoutes = () => {
    if (isLoggedIn) {
      return RouteBuilder(role);
    }
    return [];
  };

  const NavListItems = () => {
    if (isLoggedIn) {
      return TopBarNavigation(role);
    }
    return [];
  };

  const routing = useRoutes([
    { path: "", element: <IndexPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
    ...getRoutes(),
  ]);

  //   useEffect(() => {
  //     if (!isLoggedIn) navigate("");
  //   }, [isLoggedIn]);

  return (
    <>
      <NavbarComponent navListItems={NavListItems()} />
      <div className="p-5">{routing}</div>
    </>
  );
};
export default MainLayout;
