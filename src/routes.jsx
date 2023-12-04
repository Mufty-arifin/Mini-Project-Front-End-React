import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDetail from "./pages/UserDetail";
import ProtectedRoutes from "./hoc/ProtectedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import ListUsers from "./pages/ListUsers";
import NewUser from "./pages/NewUser";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/list-users",
    element: (
      <ProtectedRoutes>
        <ListUsers />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/new-user",
    element: (
      <ProtectedRoutes>
        <NewUser />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <ProtectedRoutes>
        <UserDetail />
      </ProtectedRoutes>
    ),
  },
];
