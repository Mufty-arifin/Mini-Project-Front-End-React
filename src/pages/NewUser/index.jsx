import "./style.css";
import Sidebar from "../../components/Sidebar";

const NewUser = () => {
  return (
    <div>
      <Sidebar />
      <div className="container-custom">
        <div className="header-custom">
          <div className="nav-custom"></div>
        </div>
        <div className="content-users">
          <div className="content-1">
            <h2>New User</h2>
          </div>
          <div className="content-2">
            <form className="form">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
               
                required
              />

              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
               
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
               
                required
              />

              <button type="submit">Add User</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
