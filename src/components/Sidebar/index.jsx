import "./style.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Sidebar = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      buttons: ["Cancel", "Logout"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login");
        swal({
          title: "You have been logged out!",
          text: "This alert will disappear after 3 seconds.",
          position: "center",
          icon: "success",
          timer: 3000,
          button: false,
        });
      }
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="side-menu">
      <div className="brand-name">
        <h1>Admin Site</h1>
      </div>
      <ul style={{ paddingLeft: "0" }}>
        <Link to={"/"}>
          <li className={isActive("/") ? "menuItem active-menu" : "menuItem"}>
            <i className="bx bx-home"></i>&nbsp;
            <span style={{ fontSize: "20px", fontWeight: "600" }}>
              Dashboard
            </span>
          </li>
        </Link>
        <Link to={"/list-users"}>
          <li
            className={
              isActive("/list-users") ? "menuItem active-menu" : "menuItem"
            }
          >
            <i className="bx bxs-user"></i>&nbsp;
            <span style={{ fontSize: "20px", fontWeight: "600" }}>
              List Users
            </span>
          </li>
        </Link>
        <Link to={"/new-user"}>
          <li
            className={
              isActive("/new-user") ? "menuItem active-menu" : "menuItem"
            }
          >
            <i className="bx bx-user-plus"></i>
            &nbsp;
            <span style={{ fontSize: "20px", fontWeight: "600" }}>
              New User
            </span>
          </li>
        </Link>

        {accessToken ? (
          <li
            onClick={handleLogout}
            className="menuItem"
            style={{ cursor: "pointer" }}
          >
            <i className="bx bx-log-out"></i>&nbsp;
            <span>Logout</span>
          </li>
        ) : (
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
