import "./style.css";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
const UserDetail = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");

  const param = useParams();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    axios
      .get(`https://reqres.in/api/users/${param.id}`)
      .then((respon) => {
        setUser(respon.data.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.respon.data);
      });
  };
  return (
    <div>
      <Sidebar />
      <div className="container-custom">
        <div className="header-custom">
          <div className="nav-custom"></div>
        </div>
        <div className="content-custom">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/list-users">List Users</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
          <h1>User Detail</h1>
          {error.length ? <p>{error}</p> : null}
          {user ? (
            <div className="user-card">
              <img src={user.avatar} alt="User Profile" />

              <div className="user-info">
                <h2>
                  {user.first_name} {user.last_name}
                </h2>
                <p>{user.email}</p>
                <p>Phone: +123456789</p>
              </div>
              <div className="user-actions">
                <button className="edit-button">Edit</button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
