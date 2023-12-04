import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";
import Sidebar from "../../components/Sidebar";
import img2 from "../../assets/img/search.png";
import { Link } from "react-router-dom";
const ListUsers = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    total_pages: 0,
    current_page: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    setPage({
      ...page,
      current_page: page.current_page - 1,
    });
  };
  const handleNext = () => {
    setPage({
      ...page,
      current_page: page.current_page + 1,
    });
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = () => {
    // You can add additional logic here if needed
    getData(); // Refresh the data based on the current page when submitting the search
  };
  const getData = () => {
    axios
      .get(`https://reqres.in/api/users?per_page=5&page=${page.current_page}`)
      .then((res) => {
        setData(res.data.data);
        setPage({
          total_pages: res.data.total_pages,
          current_page: res.data.page,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Count Users

  useEffect(() => {
    getData();
  }, [page.current_page]);

  const filteredUsers = data.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <Sidebar />
      <div className="container-custom">
        <div className="header-custom">
          <div className="nav-custom">
            <div className="search">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search.."
              />
              <button
                type="submit"
                onClick={handleSearchSubmit}
                style={{ cursor: "pointer" }}
              >
                <img src={img2} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="content-users">
          <div className="content-1">
            <h2>List Users</h2>
          </div>
          <div className="content-2">
            <div className="list-users">
              <div className="title">
                <Link to={"/new-user"}>
                <button className="btn-add">
                  <i
                    className="bx bx-user-plus"
                    style={{ fontSize: "20px" }}
                  ></i>
                  Add
                </button>
                </Link>
                <div className="pagination">
                  <button
                    className="btn-pagination"
                    onClick={handleBack}
                    disabled={page.current_page === 1}
                  >
                    <i className="bx bxs-chevron-left"></i> Back
                  </button>
                  <button
                      className="btn-pagination"
                      onClick={handleNext}
                      disabled={page.current_page === page.total_pages}
                    >
                      Next <i className="bx bxs-chevron-right"></i>
                    </button>
                </div>
              </div>
              <table className="responsive-table">
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Option</th>
                </tr>

                {filteredUsers.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.avatar} alt="img-users" />
                    </td>
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                    <td>{item.email}</td>
                    <td>
                      <Link to={`/user/${item.id}`}>
                        <button
                          className="btn btn-info"
                          style={{ margin: "5px" }}
                        >
                          <i className="bx bx-search-alt-2"></i>
                        </button>
                      </Link>
                      <button
                        className="btn btn-warning"
                        style={{ margin: "5px" }}
                      >
                        <i className="bx bxs-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ margin: "5px" }}
                      >
                        <i className="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                <td></td>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUsers;
